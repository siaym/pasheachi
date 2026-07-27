import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_gGBNnkEW_3gNfKcdWc3D4dD6X6PSd7BFD");

export async function sendVerificationEmail(toEmail: string, name: string, verificationCode?: string) {
  try {
    const code = verificationCode || Math.floor(100000 + Math.random() * 900000).toString();
    const data = await resend.emails.send({
      from: "PasheAchi <info@pasheachi.bro.bd>",
      to: [toEmail],
      subject: "Welcome to PasheAchi — Verify your account",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 2px solid #1D2927; background-color: #FAF8F3; color: #1D2927;">
          <div style="font-family: monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #A84D2A; margin-bottom: 20px;">
            PASHEACHI • VERIFICATION DOSSIER
          </div>
          
          <h1 style="font-size: 28px; margin: 0 0 16px 0; font-weight: normal;">
            Welcome beside us, ${name}.
          </h1>
          
          <p style="font-family: sans-serif; font-size: 15px; line-height: 1.6; color: #53605C; margin-bottom: 24px;">
            Thank you for joining PasheAchi. Your account has been registered. Please use the authorization code below to complete your verification:
          </p>
          
          <div style="margin: 30px 0; text-align: center;">
            <span style="font-family: monospace; display: inline-block; padding: 16px 32px; background-color: #1D2927; color: #F7F4ED; font-weight: bold; letter-spacing: 4px; font-size: 24px; border: 1px solid #1D2927;">
              ${code}
            </span>
          </div>
          
          <p style="font-family: sans-serif; font-size: 12px; color: #8C7A5B; border-t: 1px dashed #D9D3C7; padding-top: 20px; margin-top: 30px;">
            If you did not initiate this request, no further action is required.
          </p>
        </div>
      `,
    });
    return { success: true, data, code };
  } catch (error: any) {
    console.error("Failed to send verification email via Resend:", error);
    return { success: false, error: error.message };
  }
}
