import { Resend } from "resend";
import { NextResponse } from "next/server";

// Gökçe'nin mail adresi
const TO_EMAIL = process.env.CONTACT_EMAIL ?? "gokcedila.caglayan@outlook.com";
const FROM_EMAIL = "noreply@makeupbygocke.com"; // Domain doğrulandıktan sonra aktif olur

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, service, date, message, lang } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Ad ve e-posta zorunludur." },
        { status: 400 }
      );
    }

    const isTr = lang === "tr";

    const subject = isTr
      ? `Yeni Randevu Talebi — ${name}${service ? ` (${service})` : ""}`
      : `New Booking Request — ${name}${service ? ` (${service})` : ""}`;

    const htmlBody = `
<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="utf-8"><style>
  body { font-family: Georgia, serif; color: #1a1410; background: #fafaf8; margin: 0; padding: 0; }
  .container { max-width: 560px; margin: 0 auto; padding: 2rem; }
  .header { border-bottom: 2px solid #b5533c; padding-bottom: 1rem; margin-bottom: 1.5rem; }
  .brand { font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #b5533c; }
  .title { font-size: 1.4rem; font-weight: 300; margin: 0.5rem 0 0; }
  .field { margin-bottom: 1rem; }
  .label { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: #888; display: block; margin-bottom: 0.2rem; }
  .value { font-size: 0.95rem; }
  .message-box { background: #f0ede8; padding: 1rem; border-left: 3px solid #b5533c; margin-top: 0.5rem; }
  .footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e8e0d4; font-size: 0.7rem; color: #aaa; }
</style></head>
<body>
<div class="container">
  <div class="header">
    <p class="brand">Makeup by Gökçe</p>
    <h1 class="title">${isTr ? "Yeni Randevu Talebi" : "New Booking Request"}</h1>
  </div>

  <div class="field">
    <span class="label">${isTr ? "Ad Soyad" : "Name"}</span>
    <span class="value">${name}</span>
  </div>

  <div class="field">
    <span class="label">E-posta</span>
    <span class="value"><a href="mailto:${email}">${email}</a></span>
  </div>

  ${service ? `<div class="field">
    <span class="label">${isTr ? "Hizmet" : "Service"}</span>
    <span class="value">${service}</span>
  </div>` : ""}

  ${date ? `<div class="field">
    <span class="label">${isTr ? "Tarih" : "Date"}</span>
    <span class="value">${date}</span>
  </div>` : ""}

  ${message ? `<div class="field">
    <span class="label">${isTr ? "Mesaj" : "Message"}</span>
    <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
  </div>` : ""}

  <div class="footer">
    makeupbygocke.com &nbsp;·&nbsp; @makeupbygocke
  </div>
</div>
</body>
</html>
    `.trim();

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Mail gönderilemedi." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
