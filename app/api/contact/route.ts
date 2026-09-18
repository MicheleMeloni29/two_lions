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
<body style="margin: 0; padding: 24px 12px; background-color: #f2f0ea; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1a1a1a; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dfdbd2; border-radius: 8px; overflow: hidden; box-shadow: 0 6px 20px rgba(37, 30, 87, 0.08);">
    <!-- Two Lions Luxury Header -->
    <tr>
      <td style="background-color: #251e57; padding: 32px 28px 26px; text-align: center; border-bottom: 3px solid #b59a5a;">
        <!-- Two Lions Official Logo -->
        <img src="https://two-lions.vercel.app/twoLions_logo.png" alt="Two Lions International" width="120" style="display: block; margin: 0 auto 14px; max-width: 120px; height: auto; border: 0;" />
        <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; color: #b59a5a; font-weight: 700; margin-bottom: 6px;">Two Lions International</span>
        <h1 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.04em; color: #ffffff; text-transform: uppercase; font-family: 'Times New Roman', Georgia, serif;">Nuovo Messaggio dal Sito Web</h1>
      </td>
    </tr>

    <!-- Body Content -->
    <tr>
      <td style="padding: 32px 30px;">
        <!-- Sender Summary Table -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; width: 130px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #b59a5a; font-weight: 700; border-bottom: 1px solid #f0ede6;">Mittente:</td>
            <td style="padding: 10px 0; font-size: 15px; color: #251e57; font-weight: 700; border-bottom: 1px solid #f0ede6;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #b59a5a; font-weight: 700; border-bottom: 1px solid #f0ede6;">Email di Risposta:</td>
            <td style="padding: 10px 0; font-size: 15px; border-bottom: 1px solid #f0ede6;">
              <a href="mailto:${email}?to=${encodeURIComponent(email)}&subject=Re:%20${encodeURIComponent(subject)}" style="color: #251e57; text-decoration: underline; font-weight: 600;">${escapeHtml(email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #b59a5a; font-weight: 700; border-bottom: 1px solid #f0ede6;">Oggetto:</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1f275c; font-weight: 600; border-bottom: 1px solid #f0ede6;">${escapeHtml(subject)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #b59a5a; font-weight: 700;">Data e Ora:</td>
            <td style="padding: 10px 0; font-size: 13px; color: #68645e;">${receivedAt} (CET)</td>
          </tr>
        </table>

        <!-- Message Body Container -->
        <div style="margin-top: 15px; margin-bottom: 28px;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #b59a5a; font-weight: 700; display: block; margin-bottom: 10px;">Testo del Messaggio:</span>
          <div style="background-color: #fbfaf8; border-left: 4px solid #b59a5a; border-radius: 0 4px 4px 0; padding: 18px 22px; font-size: 14px; color: #222222; white-space: pre-wrap; line-height: 1.65; border-top: 1px solid #f0ede6; border-right: 1px solid #f0ede6; border-bottom: 1px solid #f0ede6;">${escapeHtml(message)}</div>
        </div>

        <!-- Quick Reply Action Button -->
        <div style="background-color: #f7f6f2; border: 1px solid #e7e3da; border-radius: 6px; padding: 20px; text-align: center; margin-top: 24px;">
          <a href="mailto:${email}?to=${encodeURIComponent(email)}&subject=Re:%20${encodeURIComponent(subject)}" target="_blank" style="background-color: #251e57; color: #ffffff; border: 2px solid #b59a5a; border-radius: 3px; padding: 14px 28px; text-decoration: none; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.18em; display: inline-block; box-shadow: 0 3px 8px rgba(37, 30, 87, 0.18);">
            Rispondi a ${escapeHtml(name)} &rarr;
          </a>
          <p style="margin: 12px 0 0; font-size: 12px; color: #1f275c; line-height: 1.5;">
            Destinatario preimpostato per la risposta: <a href="mailto:${email}?to=${encodeURIComponent(email)}&subject=Re:%20${encodeURIComponent(subject)}" style="color: #b59a5a; font-weight: 700; text-decoration: underline;">${escapeHtml(email)}</a>
          </p>
          <p style="margin: 6px 0 0; font-size: 11px; color: #767069;">
            (In alternativa, puoi anche premere il normale pulsante &laquo;Rispondi&raquo; ↩ della tua webmail).
          </p>
        </div>
      </td>
    </tr>

    <!-- Two Lions Corporate Footer -->
    <tr>
      <td style="background-color: #f7f6f2; padding: 20px 30px; border-top: 1px solid #e7e3da; font-size: 11px; color: #888279; line-height: 1.6; text-align: center;">
        <span style="font-weight: 600; color: #251e57; text-transform: uppercase; letter-spacing: 0.08em;">Two Lions International Corporation</span><br />
        Questo messaggio è stato generato automaticamente dal form ufficiale di contatto del sito web. L'indirizzo del visitatore è preimpostato come <code>Reply-To</code> per rispondere direttamente.
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
