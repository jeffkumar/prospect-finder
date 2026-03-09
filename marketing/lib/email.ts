import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL =
  process.env.FROM_EMAIL ?? "Adventure Flow <noreply@adventureflow.ai>";
const CONTACT_TO_EMAIL =
  process.env.CONTACT_EMAIL ?? "jeff@adventureflow.ai";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactRequestEmail({
  name,
  email,
  message,
  phone,
}: {
  name: string;
  email: string;
  message: string;
  phone?: string;
}) {
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `Adventure Flow: Contact from ${name}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <p style="font-size: 14px; color: #666;">Someone requested guidance or contact from the Adventure Flow site.</p>
        <p style="font-size: 14px; color: #333;"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="font-size: 14px; color: #333;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p style="font-size: 14px; color: #333;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        <p style="font-size: 14px; color: #333;"><strong>Message:</strong></p>
        <div style="font-size: 14px; color: #333; white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 8px;">${escapeHtml(message)}</div>
        <p style="font-size: 12px; color: #999; margin-top: 24px;">Reply directly to this email to respond to ${escapeHtml(email)}.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send contact request email:", error);
    throw new Error("Failed to send contact request email");
  }
}
