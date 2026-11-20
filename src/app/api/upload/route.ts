import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://onpgcylzidbggncsmtso.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "pasheachi-media";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const filename = `uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    
    if (!supabaseKey) {
      return NextResponse.json({ success: false, error: "Storage credentials not configured" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Attempt upload
    let { error } = await supabase.storage
      .from(bucketName)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true,
      });

    // If bucket does not exist, create it automatically and retry
    if (error && (error.message?.includes("not found") || error.message?.includes("Bucket"))) {
      await supabase.storage.createBucket(bucketName, { public: true });
      const retry = await supabase.storage
        .from(bucketName)
        .upload(filename, buffer, {
          contentType: file.type,
          upsert: true,
        });
      error = retry.error;
    }

    if (error) {
      console.error("Supabase storage error:", error);
      return NextResponse.json({ success: false, error: "Failed to upload to cloud storage" }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filename);
      
    return NextResponse.json({ success: true, url: publicUrlData.publicUrl });
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to process image" }, { status: 500 });
  }
}
