import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string; // Honeypot field for bot protection
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function cleanEnv(val?: string) {
  if (!val) return "";
  return val
    .trim()
    .replace(/;+$/, "")
    .replace(/^["']|["']$/g, "")
    .replace(/;+$/, "")
    .trim();
}

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const resendApiKey = cleanEnv(
    process.env.RESEND_API_KEY ||
    process.env.resend_api_key ||
    process.env.RESEND_KEY ||
    process.env.RESEND_TOKEN
  );

  const contactEmailTo = cleanEnv(
    process.env.CONTACT_EMAIL_TO ||
    process.env.CONTACT_EMAIL ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL
  );

  const contactEmailFrom = cleanEnv(
    process.env.CONTACT_EMAIL_FROM ||
    process.env.RESEND_FROM
  ) || "Two Lions <onboarding@resend.dev>";

  const missing: string[] = [];
  if (!resendApiKey) missing.push("RESEND_API_KEY");
  if (!contactEmailTo) missing.push("CONTACT_EMAIL_TO");
  if (!contactEmailFrom) missing.push("CONTACT_EMAIL_FROM");

  if (missing.length > 0) {
    console.error("[Contact API] Configurazione incompleta su Vercel. Variabili mancanti:", missing);
    return NextResponse.json(
      {
        error: `Servizio email non configurato sul server. Variabili mancanti: ${missing.join(", ")}.`,
        missing,
      },
      { status: 500 }
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Richiesta non valida o formato JSON errato." }, { status: 400 });
  }

  // Honeypot anti-spam check: se il campo nascosto 'website' è compilato, è un bot
  if (payload.website && payload.website.trim().length > 0) {
    console.warn("[Contact API] Invio bloccato da Honeypot (possibile bot rilevato).");
    return NextResponse.json({ ok: true, spam_filtered: true });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Tutti i campi obbligatori (nome, email, oggetto, messaggio) devono essere compilati." },
      { status: 400 }
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: "L'indirizzo email inserito non è valido." },
      { status: 400 }
    );
  }

  const formattedSubject = `[Two Lions Contatti] ${subject} - da ${name}`;
  const receivedAt = new Date().toLocaleString("it-IT", {
    timeZone: "Europe/Rome",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const emailHtml = `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(formattedSubject)}</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f7f6f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1a1a1a; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e0d8; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
    <!-- Header -->
    <tr>
      <td style="background-color: #0b0b0c; padding: 28px 32px; border-bottom: 2px solid #c5a880;">
        <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.28em; color: #c5a880; font-weight: 600; display: block; margin-bottom: 6px;">Two Lions International</span>
        <h1 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.04em; color: #f2ede4; text-transform: uppercase;">Nuovo Messaggio dal Sito</h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 32px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
          <tr>
            <td style="padding-bottom: 12px; width: 120px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #767069; font-weight: 600;">Mittente:</td>
            <td style="padding-bottom: 12px; font-size: 15px; color: #111111; font-weight: 600;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding-bottom: 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #767069; font-weight: 600;">Email:</td>
            <td style="padding-bottom: 12px; font-size: 15px; color: #111111;">
              <a href="mailto:${escapeHtml(email)}" style="color: #0b0b0c; text-decoration: underline; font-weight: 500;">${escapeHtml(email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #767069; font-weight: 600;">Oggetto:</td>
            <td style="padding-bottom: 12px; font-size: 15px; color: #111111;">${escapeHtml(subject)}</td>
          </tr>
          <tr>
            <td style="padding-bottom: 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #767069; font-weight: 600;">Data e Ora:</td>
            <td style="padding-bottom: 12px; font-size: 13px; color: #767069;">${receivedAt} (CET)</td>
          </tr>
        </table>

        <div style="border-top: 1px solid #ebe7df; padding-top: 20px; margin-bottom: 28px;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #767069; font-weight: 600; display: block; margin-bottom: 10px;">Messaggio:</span>
          <div style="background-color: #faf9f6; border-left: 3px solid #c5a880; padding: 16px 20px; font-size: 14px; color: #222222; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</div>
        </div>

        <!-- Quick Reply Action -->
        <div style="text-align: left; padding-top: 10px;">
          <a href="mailto:${escapeHtml(email)}?subject=Re:%20${encodeURIComponent(subject)}" style="background-color: #0b0b0c; color: #f2ede4; border: 1px solid #c5a880; border-radius: 2px; padding: 12px 24px; text-decoration: none; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.16em; display: inline-block;">
            Rispondi a ${escapeHtml(name)} &rarr;
          </a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #faf9f6; padding: 18px 32px; border-top: 1px solid #ebe7df; font-size: 11px; color: #888279; line-height: 1.5;">
        Ricevuto dal form di contatto ufficiale su Two Lions International. Rispondendo a questa email risponderai direttamente a <strong>${escapeHtml(email)}</strong> (grazie all'intestazione Reply-To).
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactEmailFrom,
        to: [contactEmailTo],
        reply_to: email,
        subject: formattedSubject,
        text: [
          `Nuovo messaggio di contatto da: ${name} (${email})`,
          `Oggetto: ${subject}`,
          `Ricevuto il: ${receivedAt}`,
          "",
          "--- Messaggio ---",
          message,
          "",
          `Per rispondere, scrivi direttamente a: ${email}`,
        ].join("\n"),
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error("[Contact API] Errore Resend API:", resendResponse.status, errorData);

      let parsedError = "Errore durante l'invio dell'email con Resend.";
      try {
        const jsonErr = JSON.parse(errorData);
        if (jsonErr.message) {
          parsedError = jsonErr.message;
        }
      } catch {
        if (errorData) parsedError = errorData;
      }

      return NextResponse.json(
        { error: parsedError },
        { status: 502 }
      );
    }

    const data = await resendResponse.json();
    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error("[Contact API] Eccezione di rete o server:", err);
    return NextResponse.json(
      { error: "Errore di connessione al servizio email. Riprova più tardi." },
      { status: 500 }
    );
  }
}
