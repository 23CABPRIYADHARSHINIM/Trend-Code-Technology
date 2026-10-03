const nodemailer = require("nodemailer");

const DEFAULT_RECIPIENT = "tctfashionhub@gmail.com";
let cachedTransport = null;
let cachedConfig = "";

function config() {
  return {
    user: process.env.GMAIL_SMTP_USER || "",
    appPassword: (process.env.GMAIL_SMTP_APP_PASSWORD || "").replace(/\s/g, ""),
    to: process.env.ENQUIRY_EMAIL_TO || DEFAULT_RECIPIENT,
  };
}

function isConfigured() {
  const { user, appPassword } = config();
  return Boolean(user && appPassword);
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function getTransport({ user, appPassword }) {
  const key = `${user}\n${appPassword}`;
  if (!cachedTransport || cachedConfig !== key) {
    cachedTransport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass: appPassword },
    });
    cachedConfig = key;
  }
  return cachedTransport;
}

function buildEmail(enquiry) {
  const name = escapeHtml(enquiry.name);
  const phone = escapeHtml(enquiry.phone);
  const email = escapeHtml(enquiry.email);
  const service = escapeHtml(enquiry.service);
  const message = escapeHtml(enquiry.message || "No message provided").replace(/\r?\n/g, "<br>");
  const createdAt = new Date(enquiry.created_at || Date.now()).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  return {
    subject: `New Class Enquiry — ${enquiry.name} | TCT Fashion Hub`,
    text: [
      "NEW CLASS ENQUIRY",
      "TCT Fashion Hub · Where threads meet tradition",
      "",
      `Name: ${enquiry.name}`,
      `Phone: ${enquiry.phone}`,
      `Email: ${enquiry.email}`,
      `Interested in: ${enquiry.service}`,
      `Message: ${enquiry.message || "No message provided"}`,
      "",
      `Received: ${createdAt} (IST)`,
      `Enquiry ID: ${enquiry.id}`,
    ].join("\n"),
    html: `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:28px 12px;background:#f5f2ed;font-family:Arial,Helvetica,sans-serif;color:#253044">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;background:#fff;border:1px solid #eadfce;border-radius:16px;overflow:hidden">
      <tr><td style="padding:24px 28px;background:#173b70;color:#fff">
        <p style="margin:0 0 7px;color:#f3b36b;font-size:11px;font-weight:bold;letter-spacing:2px">TCT FASHION HUB</p>
        <h1 style="margin:0;font-size:23px;line-height:1.3">New class enquiry</h1>
        <p style="margin:7px 0 0;color:#e4eaf4;font-size:13px">A new message has arrived from your website.</p>
      </td></tr>
      <tr><td style="padding:24px 28px 12px">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;line-height:1.5">
          <tr><td style="padding:10px 0;color:#778196;width:145px;border-bottom:1px solid #eee8df">Name</td><td style="padding:10px 0;font-weight:bold;border-bottom:1px solid #eee8df">${name}</td></tr>
          <tr><td style="padding:10px 0;color:#778196;border-bottom:1px solid #eee8df">Phone</td><td style="padding:10px 0;border-bottom:1px solid #eee8df"><a href="tel:${escapeHtml(enquiry.phone)}" style="color:#185abd;text-decoration:none">${phone}</a></td></tr>
          <tr><td style="padding:10px 0;color:#778196;border-bottom:1px solid #eee8df">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee8df"><a href="mailto:${email}" style="color:#185abd;text-decoration:none">${email}</a></td></tr>
          <tr><td style="padding:10px 0;color:#778196">Interested in</td><td style="padding:10px 0;font-weight:bold;color:#bf5628">${service}</td></tr>
        </table>
        <div style="margin-top:18px;padding:15px 17px;background:#fff8f1;border:1px solid #f0dfcb;border-radius:11px">
          <p style="margin:0 0 7px;color:#778196;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase">Message</p>
          <p style="margin:0;font-size:14px;line-height:1.65">${message}</p>
        </div>
      </td></tr>
      <tr><td style="padding:15px 28px 22px;color:#778196;font-size:11px;line-height:1.7">
        Received ${escapeHtml(createdAt)} IST · Enquiry #${escapeHtml(enquiry.id)}<br>
        Reply directly to this email to contact the student.
      </td></tr>
    </table>
    <p style="margin:14px 0 0;color:#8c929e;font-size:11px">Where threads meet tradition</p>
  </td></tr></table>
</body></html>`,
  };
}

async function sendEnquiryEmail(enquiry) {
  const { user, appPassword, to } = config();
  if (!user || !appPassword) {
    console.warn("[email] not configured (set GMAIL_SMTP_USER and GMAIL_SMTP_APP_PASSWORD) — skipping send");
    return { ok: false, skipped: true };
  }

  try {
    const mail = buildEmail(enquiry);
    const info = await getTransport({ user, appPassword }).sendMail({
      from: `TCT Fashion Hub <${user}>`,
      to,
      replyTo: enquiry.email,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
    return { ok: true, id: info.messageId || "" };
  } catch (error) {
    console.error(`[email] enquiry #${enquiry.id} send failed: ${error.message}`);
    return { ok: false, error: error.message };
  }
}

function buildCustomerEmail(enquiry) {
  const name = escapeHtml(enquiry.name);
  const service = escapeHtml(enquiry.service);
  return {
    subject: `Thank you for your enquiry | TCT Fashion Hub`,
    text: `Hi ${enquiry.name},\n\nThank you for reaching out to TCT Fashion Hub regarding ${enquiry.service}. We have received your enquiry and our team will get back to you shortly.\n\nBest regards,\nTCT Fashion Hub`,
    html: `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:28px 12px;background:#f5f2ed;font-family:Arial,Helvetica,sans-serif;color:#253044">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;background:#fff;border:1px solid #eadfce;border-radius:16px;overflow:hidden">
      <tr><td style="padding:24px 28px;background:#173b70;color:#fff">
        <p style="margin:0 0 7px;color:#f3b36b;font-size:11px;font-weight:bold;letter-spacing:2px">TCT FASHION HUB</p>
        <h1 style="margin:0;font-size:23px;line-height:1.3">Thank you for your enquiry!</h1>
      </td></tr>
      <tr><td style="padding:24px 28px 12px;font-size:15px;line-height:1.6">
        <p>Hi <strong>${name}</strong>,</p>
        <p>We have received your enquiry regarding <strong>${service}</strong>.</p>
        <p>Our team will review your message and get back to you shortly. If you have any urgent questions, feel free to reply directly to this email.</p>
        <p style="margin-top:20px;">Best regards,<br><strong>TCT Fashion Hub Team</strong></p>
      </td></tr>
    </table>
    <p style="margin:14px 0 0;color:#8c929e;font-size:11px">Where threads meet tradition</p>
  </td></tr></table>
</body></html>`,
  };
}

async function sendCustomerThankYouEmail(enquiry) {
  const { user, appPassword } = config();
  if (!user || !appPassword || !enquiry.email) {
    return { ok: false, skipped: true };
  }

  try {
    const mail = buildCustomerEmail(enquiry);
    const info = await getTransport({ user, appPassword }).sendMail({
      from: `TCT Fashion Hub <${user}>`,
      to: enquiry.email,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
    return { ok: true, id: info.messageId || "" };
  } catch (error) {
    console.error(`[email] customer thank you #${enquiry.id} send failed: ${error.message}`);
    return { ok: false, error: error.message };
  }
}

module.exports = { isConfigured, sendEnquiryEmail, sendCustomerThankYouEmail };
