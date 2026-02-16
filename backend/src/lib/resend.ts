import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "info@glowreajo.com";

export async function sendOtpEmail(to: string, code: string) {
  const { error } = await resend.emails.send({
    from: `GlowReaJo <${FROM_EMAIL}>`,
    to,
    subject: `Your GlowReaJo verification code: ${code}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #e8998d; font-size: 24px; margin: 0;">GlowReaJo</h1>
          <p style="color: #888; font-size: 14px; margin-top: 4px;">Your K-Beauty Destination</p>
        </div>
        <div style="background: #faf7f5; border-radius: 16px; padding: 32px; text-align: center;">
          <p style="color: #333; font-size: 16px; margin: 0 0 8px;">Your verification code is:</p>
          <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #e8998d; margin: 16px 0;">
            ${code}
          </div>
          <p style="color: #888; font-size: 13px; margin: 16px 0 0;">
            This code expires in 5 minutes. Do not share it with anyone.
          </p>
        </div>
        <p style="color: #aaa; font-size: 12px; text-align: center; margin-top: 24px;">
          If you didn't request this code, please ignore this email.
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
}
