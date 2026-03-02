import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { senderEmail, subject, body } = await req.json();

        if (!subject || !body) {
            return NextResponse.json(
                { error: "Missing subject or body" },
                { status: 400 }
            );
        }

        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS;
        // Destination is always Bikram's email — hardcoded in code, not an env var
        const to = "codesnippets45@gmail.com";

        if (!user || !pass) {
            console.error("Email credentials not configured");
            return NextResponse.json(
                { error: "Email service not configured on server" },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user, pass },
        });

        const fromLabel = senderEmail
            ? `Reactz Agent <${user}> (on behalf of ${senderEmail})`
            : `Reactz Agent <${user}>`;

        const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
    .card { background: #fff; border-radius: 10px; padding: 28px 32px; max-width: 600px; margin: auto; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .badge { display: inline-block; background: #6d28d9; color: #fff; font-size: 12px; padding: 3px 10px; border-radius: 20px; margin-bottom: 16px; }
    .sender { background: #f3f0ff; border-left: 4px solid #6d28d9; padding: 10px 14px; border-radius: 4px; margin-bottom: 18px; font-size: 14px; color: #4c1d95; }
    .body-text { font-size: 15px; line-height: 1.7; color: #333; white-space: pre-wrap; }
    .footer { margin-top: 24px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">✉ Via Reactz Agent — Portfolio Chat</div>
    ${senderEmail ? `<div class="sender"><strong>From:</strong> ${senderEmail}</div>` : ""}
    <div class="body-text">${body.replace(/\n/g, "<br/>")}</div>
    <div class="footer">This email was sent via the Reactz Agent chat widget on Bikram Mondal's portfolio.</div>
  </div>
</body>
</html>`;

        await transporter.sendMail({
            from: fromLabel,
            to,
            replyTo: senderEmail || undefined,
            subject: subject,
            text: body,
            html: htmlBody,
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Send email error:", err);
        return NextResponse.json(
            { error: err.message || "Failed to send email" },
            { status: 500 }
        );
    }
}
