import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://onpgcylzidbggncsmtso.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
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
    
    // If Supabase key is available, upload directly to Supabase Storage CDN
    if (supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { error } = await supabase.storage
        .from(bucketName)
        .upload(filename, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (!error) {
        const { data: publicUrlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filename);
        
        return NextResponse.json({ success: true, url: publicUrlData.publicUrl });
      }
    }

    // High performance fallback: base64 Data URL
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
    return NextResponse.json({ success: true, url: base64 });

  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to process image" }, { status: 500 });
  }
}
