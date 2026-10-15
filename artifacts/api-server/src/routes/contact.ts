import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const resend = new Resend(process.env.RESEND_API_KEY);

const PRACTICE_EMAIL = "doctors@advancedvisionli.com";
// Default to Resend's test sender until the practice domain is verified in Resend.
// Set FROM_EMAIL env var to a Resend-verified address (e.g. website@advancedvisionli.com)
// once DNS verification is complete.
const FROM_EMAIL = process.env.FROM_EMAIL ?? "onboarding@resend.dev";

interface ContactBody {
  name: string;
  phone: string;
  email?: string;
  relationship?: string;
  message: string;
}

router.post("/contact", async (req, res) => {
  const { name, phone, email, relationship, message } = req.body as ContactBody;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
    res.status(400).json({ error: "Phone number is required" });
    return;
  }
  if (!message || typeof message !== "string" || message.trim().length < 10) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  const relationshipLabel = relationship?.trim() ? ` (${relationship})` : "";
  const subject = `New contact form submission from ${name.trim()}${relationshipLabel}`;

  const lines = [
    `Name: ${name.trim()}`,
    `Phone: ${phone.trim()}`,
  ];
  if (email?.trim()) {
    lines.push(`Email: ${email.trim()}`);
  }
  if (relationship?.trim()) {
    lines.push(`Contacting for: ${relationship.trim()}`);
  }
  lines.push("", "Message:", message.trim());

  const text = lines.join("\n");
  const html = lines
    .map((line) => (line === "" ? "<br />" : `<p style="margin:0 0 4px;">${sanitizeHtml(line)}</p>`))
    .join("");

  try {
    const { error } = await resend.emails.send({
      from: `Advanced Vision Associates <${FROM_EMAIL}>`,
      to: [PRACTICE_EMAIL],
      replyTo: email?.trim() || undefined,
      subject,
      text,
      html,
    });

    if (error) {
      logger.error({ error }, "Resend returned an error sending contact form email");
      const userMessage =
        error.message?.toLowerCase().includes("verify") ||
        error.message?.toLowerCase().includes("domain")
          ? "Email service needs domain verification. Please verify advancedvisionli.com in Resend or contact support."
          : "Failed to send message. Please try again.";
      res.status(500).json({ error: userMessage });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    logger.error(err, "Unexpected error sending contact form email");
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default router;
