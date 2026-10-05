import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  const vars = {};
  if (!existsSync(envPath)) return vars;

  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    val = val
      .replace(/;+$/, "")
      .replace(/^["']|["']$/g, "")
      .replace(/;+$/, "")
      .trim();
    vars[key] = val;
  }
  return vars;
}

function escapePhpSingleQuoted(str) {
  return String(str ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}

function generateContactPhp(config) {
  const smtpHost = escapePhpSingleQuoted(config.smtpHost);
  const smtpPort = Number(config.smtpPort) || 465;
  const smtpUser = escapePhpSingleQuoted(config.smtpUser);
  const smtpPass = escapePhpSingleQuoted(config.smtpPass);
  const contactEmailTo = escapePhpSingleQuoted(config.contactEmailTo);
  const contactEmailFrom = escapePhpSingleQuoted(config.contactEmailFrom);

  return `<?php
/**
 * Two Lions International - Native Contact Form Mailer (Mailcow / Apache)
 * Generato automaticamente da npm run build:static
 */

declare(strict_types=1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Metodo non consentito. Usa POST.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$SMTP_HOST = '${smtpHost}';
$SMTP_PORT = ${smtpPort};
$SMTP_USER = '${smtpUser}';
$SMTP_PASS = '${smtpPass}';
$CONTACT_EMAIL_TO = '${contactEmailTo}';
$CONTACT_EMAIL_FROM = '${contactEmailFrom}';

$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput ?: '', true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['error' => 'Richiesta non valida o formato JSON errato.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Honeypot anti-spam
$website = isset($payload['website']) ? trim((string)$payload['website']) : '';
if ($website !== '') {
    echo json_encode(['ok' => true, 'spam_filtered' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

$name = isset($payload['name']) ? trim((string)$payload['name']) : '';
$email = isset($payload['email']) ? trim((string)$payload['email']) : '';
$subject = isset($payload['subject']) ? trim((string)$payload['subject']) : '';
$message = isset($payload['message']) ? trim((string)$payload['message']) : '';

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    http_response_code(400);
    echo json_encode([
        'error' => 'Tutti i campi obbligatori (nome, email, oggetto, messaggio) devono essere compilati.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'error' => "L'indirizzo email inserito non è valido."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function escape_html(string $val): string {
    return htmlspecialchars($val, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

try {
    $tz = new DateTimeZone('Europe/Rome');
    $now = new DateTime('now', $tz);
    $receivedAt = $now->format('d/m/Y, H:i');
    $rfcDate = $now->format(DateTime::RFC2822);
} catch (Throwable $e) {
    $receivedAt = date('d/m/Y, H:i');
    $rfcDate = date('r');
}

$formattedSubject = "[Two Lions Contatti] {$subject} - da {$name}";
$safeSubject = escape_html($formattedSubject);
$safeName = escape_html($name);
$safeEmail = escape_html($email);
$safeUserSubject = escape_html($subject);
$safeMessage = escape_html($message);

$emailHtml = <<<HTML
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{$safeSubject}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f2f0ea; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1a1a1a; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dfdbd2; border-radius: 8px; overflow: hidden; box-shadow: 0 6px 20px rgba(37, 30, 87, 0.08);">
    <tr>
      <td style="background-color: #ffffff; padding: 30px 24px 22px; text-align: center; border-bottom: 3px solid #b59a5a;">
        <img src="https://twolionsinternational.com/twoLions_logo.png" alt="Two Lions International" width="130" style="display: block; margin: 0 auto 12px; max-width: 130px; height: auto; border: 0;" />
        <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.28em; color: #b59a5a; font-weight: 700; margin-bottom: 4px;">Two Lions International</span>
        <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.04em; color: #251e57; text-transform: uppercase; font-family: 'Times New Roman', Georgia, serif;">Nuovo Messaggio dal Sito Web</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px 30px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; width: 130px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #b59a5a; font-weight: 700; border-bottom: 1px solid #f0ede6;">Mittente:</td>
            <td style="padding: 10px 0; font-size: 15px; color: #251e57; font-weight: 700; border-bottom: 1px solid #f0ede6;">{$safeName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #b59a5a; font-weight: 700; border-bottom: 1px solid #f0ede6;">Email:</td>
            <td style="padding: 10px 0; font-size: 15px; border-bottom: 1px solid #f0ede6;">
              <a href="mailto:{$safeEmail}" style="color: #251e57; text-decoration: underline; font-weight: 600;">{$safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #b59a5a; font-weight: 700; border-bottom: 1px solid #f0ede6;">Oggetto:</td>
            <td style="padding: 10px 0; font-size: 15px; color: #1f275c; font-weight: 600; border-bottom: 1px solid #f0ede6;">{$safeUserSubject}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #b59a5a; font-weight: 700;">Data e Ora:</td>
            <td style="padding: 10px 0; font-size: 13px; color: #68645e;">{$receivedAt} (CET)</td>
          </tr>
        </table>
        <div style="margin-top: 15px; margin-bottom: 24px;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #b59a5a; font-weight: 700; display: block; margin-bottom: 10px;">Testo del Messaggio:</span>
          <div style="background-color: #fbfaf8; border-left: 4px solid #b59a5a; border-radius: 0 4px 4px 0; padding: 18px 22px; font-size: 14px; color: #222222; white-space: pre-wrap; line-height: 1.65; border-top: 1px solid #f0ede6; border-right: 1px solid #f0ede6; border-bottom: 1px solid #f0ede6;">{$safeMessage}</div>
        </div>
        <div style="background-color: #f7f6f2; border: 1px solid #e7e3da; border-radius: 6px; padding: 16px 20px; font-size: 12px; color: #1f275c; line-height: 1.6;">
          <strong style="color: #251e57;">Come rispondere al mittente:</strong><br />
          Per rispondere a questo messaggio ti basta premere il pulsante <strong>&laquo;Rispondi&raquo;</strong> (↩) nella barra in alto della tua casella di posta: la tua risposta verrà indirizzata automaticamente a <strong>{$safeEmail}</strong> (tramite l'intestazione Reply-To).
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f7f6f2; padding: 20px 30px; border-top: 1px solid #e7e3da; font-size: 11px; color: #888279; line-height: 1.6; text-align: center;">
        <span style="font-weight: 600; color: #251e57; text-transform: uppercase; letter-spacing: 0.08em;">Two Lions International Corporation</span><br />
        Questo messaggio è stato generato automaticamente dal form ufficiale di contatto del sito web.
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

$emailText = implode("\\r\\n", [
    "Nuovo messaggio di contatto da: {$name} ({$email})",
    "Oggetto: {$subject}",
    "Ricevuto il: {$receivedAt}",
    "",
    "--- Messaggio ---",
    $message,
    "",
    "Per rispondere, scrivi direttamente a: {$email}",
]);

$boundary = '=_TwoLions_' . bin2hex(random_bytes(12));
$messageId = '<' . bin2hex(random_bytes(10)) . '.' . time() . '@twolionsinternational.com>';
$encodedSubject = '=?UTF-8?B?' . base64_encode($formattedSubject) . '?=';

$mimeBody = implode("\\r\\n", [
    "--{$boundary}",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    rtrim(chunk_split(base64_encode($emailText), 76, "\\r\\n")),
    "--{$boundary}",
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    rtrim(chunk_split(base64_encode($emailHtml), 76, "\\r\\n")),
    "--{$boundary}--",
    ""
]);

function smtp_read($fp): string {
    $data = '';
    while (!feof($fp)) {
        $line = fgets($fp, 515);
        if ($line === false) break;
        $data .= $line;
        if (isset($line[3]) && $line[3] === ' ') break;
    }
    return $data;
}

function smtp_cmd($fp, string $cmd): string {
    fwrite($fp, $cmd . "\\r\\n");
    return smtp_read($fp);
}

function smtp_code(string $resp): int {
    return (int)substr(trim($resp), 0, 3);
}

function build_full_data(string $fromHeader, string $to, string $replyToName, string $replyToEmail, string $encodedSubject, string $rfcDate, string $messageId, string $boundary, string $mimeBody): string {
    $encodedReplyName = '=?UTF-8?B?' . base64_encode($replyToName) . '?=';
    $headers = [
        "Date: {$rfcDate}",
        "Message-ID: {$messageId}",
        "From: {$fromHeader}",
        "To: <{$to}>",
        "Reply-To: {$encodedReplyName} <{$replyToEmail}>",
        "Subject: {$encodedSubject}",
        "MIME-Version: 1.0",
        "Content-Type: multipart/alternative; boundary=\\"{$boundary}\\"",
    ];
    $raw = implode("\\r\\n", $headers) . "\\r\\n\\r\\n" . $mimeBody;
    // Dot-stuffing per RFC 5321
    $raw = preg_replace('/^\\./m', '..', $raw);
    return $raw;
}

$fullData = build_full_data(
    $CONTACT_EMAIL_FROM,
    $CONTACT_EMAIL_TO,
    $name,
    $email,
    $encodedSubject,
    $rfcDate,
    $messageId,
    $boundary,
    $mimeBody
);

$errors = [];

// 1. Se SMTP_PASS è impostata, invio autenticato via SMTPS (porta 465 SSL)
if ($SMTP_PASS !== '') {
    $ctx = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ]
    ]);
    $fp = @stream_socket_client(
        "ssl://{$SMTP_HOST}:{$SMTP_PORT}",
        $errno,
        $errstr,
        10,
        STREAM_CLIENT_CONNECT,
        $ctx
    );
    if ($fp) {
        stream_set_timeout($fp, 12);
        $greet = smtp_read($fp);
        if (smtp_code($greet) === 220) {
            smtp_cmd($fp, "EHLO twolionsinternational.com");
            $authResp = smtp_cmd($fp, "AUTH LOGIN");
            if (smtp_code($authResp) === 334) {
                smtp_cmd($fp, base64_encode($SMTP_USER));
                $passResp = smtp_cmd($fp, base64_encode($SMTP_PASS));
                if (smtp_code($passResp) === 235) {
                    $mailResp = smtp_cmd($fp, "MAIL FROM:<{$SMTP_USER}>");
                    $rcptResp = smtp_cmd($fp, "RCPT TO:<{$CONTACT_EMAIL_TO}>");
                    $dataResp = smtp_cmd($fp, "DATA");
                    if (smtp_code($dataResp) === 354) {
                        $sendResp = smtp_cmd($fp, $fullData . "\\r\\n.");
                        smtp_cmd($fp, "QUIT");
                        fclose($fp);
                        if (smtp_code($sendResp) === 250) {
                            echo json_encode(['ok' => true, 'method' => 'smtps_auth', 'messageId' => $messageId], JSON_UNESCAPED_UNICODE);
                            exit;
                        }
                        $errors[] = "SMTPS DATA failed: " . trim($sendResp);
                    } else {
                        $errors[] = "SMTPS RCPT/DATA failed: " . trim($rcptResp . ' ' . $dataResp);
                        fclose($fp);
                    }
                } else {
                    $errors[] = "SMTPS AUTH failed: " . trim($passResp);
                    fclose($fp);
                }
            } else {
                $errors[] = "SMTPS AUTH LOGIN unsupported: " . trim($authResp);
                fclose($fp);
            }
        } else {
            $errors[] = "SMTPS greeting failed: " . trim($greet);
            fclose($fp);
        }
    } else {
        $errors[] = "SMTPS connect failed: {$errstr} ({$errno})";
    }
}

// 2. Consegna diretta locale / MX su porta 25 (senza password, autorizzata da SPF ip4:2.47.51.216 / localhost)
$localHosts = ['127.0.0.1', $SMTP_HOST, 'localhost'];
$envelopeCandidates = [
    $SMTP_USER,
    'webform@twolionsinternational.com',
    $email
];

foreach ($localHosts as $host) {
    $ctx = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ]
    ]);
    $fp = @stream_socket_client(
        "tcp://{$host}:25",
        $errno,
        $errstr,
        6,
        STREAM_CLIENT_CONNECT,
        $ctx
    );
    if (!$fp) {
        $errors[] = "Port 25 ({$host}) connect: {$errstr}";
        continue;
    }

    stream_set_timeout($fp, 10);
    $greet = smtp_read($fp);
    if (smtp_code($greet) !== 220) {
        fclose($fp);
        continue;
    }

    $ehlo = smtp_cmd($fp, "EHLO twolionsinternational.com");
    if (stripos($ehlo, 'STARTTLS') !== false) {
        $tlsResp = smtp_cmd($fp, "STARTTLS");
        if (smtp_code($tlsResp) === 220) {
            @stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            smtp_cmd($fp, "EHLO twolionsinternational.com");
        }
    }

    foreach ($envelopeCandidates as $envFrom) {
        $mailResp = smtp_cmd($fp, "MAIL FROM:<{$envFrom}>");
        if (smtp_code($mailResp) !== 250) {
            smtp_cmd($fp, "RSET");
            continue;
        }
        $rcptResp = smtp_cmd($fp, "RCPT TO:<{$CONTACT_EMAIL_TO}>");
        if (smtp_code($rcptResp) !== 250 && smtp_code($rcptResp) !== 251) {
            $errors[] = "Port 25 ({$host}, from {$envFrom}) RCPT: " . trim($rcptResp);
            smtp_cmd($fp, "RSET");
            continue;
        }
        $dataResp = smtp_cmd($fp, "DATA");
        if (smtp_code($dataResp) === 354) {
            $fromHeaderToUse = ($envFrom === 'webform@twolionsinternational.com')
                ? "Two Lions International <webform@twolionsinternational.com>"
                : $CONTACT_EMAIL_FROM;
            $dataPayload = build_full_data(
                $fromHeaderToUse,
                $CONTACT_EMAIL_TO,
                $name,
                $email,
                $encodedSubject,
                $rfcDate,
                $messageId,
                $boundary,
                $mimeBody
            );
            $sendResp = smtp_cmd($fp, $dataPayload . "\\r\\n.");
            smtp_cmd($fp, "QUIT");
            fclose($fp);
            if (smtp_code($sendResp) === 250) {
                echo json_encode(['ok' => true, 'method' => "smtp25_{$host}", 'messageId' => $messageId], JSON_UNESCAPED_UNICODE);
                exit;
            }
            $errors[] = "Port 25 ({$host}) DATA: " . trim($sendResp);
            break 2;
        }
        smtp_cmd($fp, "RSET");
    }

    smtp_cmd($fp, "QUIT");
    fclose($fp);
}

// 3. Fallback nativo PHP mail() (sendmail / postfix locale)
if (function_exists('mail')) {
    $encodedReplyName = '=?UTF-8?B?' . base64_encode($name) . '?=';
    $mailHeaders = implode("\\r\\n", [
        "Date: {$rfcDate}",
        "Message-ID: {$messageId}",
        "From: {$CONTACT_EMAIL_FROM}",
        "Reply-To: {$encodedReplyName} <{$email}>",
        "MIME-Version: 1.0",
        "Content-Type: multipart/alternative; boundary=\\"{$boundary}\\"",
    ]);

    $sent = @mail($CONTACT_EMAIL_TO, $encodedSubject, $mimeBody, $mailHeaders, "-f{$SMTP_USER}");
    if (!$sent) {
        $sent = @mail($CONTACT_EMAIL_TO, $encodedSubject, $mimeBody, $mailHeaders);
    }
    if ($sent) {
        echo json_encode(['ok' => true, 'method' => 'php_mail', 'messageId' => $messageId], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $errors[] = "PHP mail() returned false";
}

http_response_code(502);
echo json_encode([
    'error' => 'Invio non riuscito tramite il mailserver.',
    'details' => $errors,
], JSON_UNESCAPED_UNICODE);
`;
}

const localVars = loadEnvLocal();

const smtpHost =
  process.env.SMTP_HOST || localVars.SMTP_HOST || "mail.twolionsinternational.com";
const smtpPort =
  process.env.SMTP_PORT || localVars.SMTP_PORT || "465";
const smtpUser =
  process.env.SMTP_USER || localVars.SMTP_USER || "noreply@twolionsinternational.com";
const smtpPass =
  process.env.SMTP_PASS || process.env.SMTP_PASSWORD || localVars.SMTP_PASS || localVars.SMTP_PASSWORD || "";
const contactEmailTo =
  process.env.CONTACT_EMAIL_TO ||
  localVars.CONTACT_EMAIL_TO ||
  "info@twolionsinternational.com";
const contactEmailFrom =
  process.env.CONTACT_EMAIL_FROM ||
  localVars.CONTACT_EMAIL_FROM ||
  `Two Lions International <${smtpUser}>`;

const localNextCommand = join(
  process.cwd(),
  "node_modules",
  ".bin",
  process.platform === "win32" ? "next.cmd" : "next"
);

const nextCommand = existsSync(localNextCommand)
  ? localNextCommand
  : process.platform === "win32"
    ? "next.cmd"
    : "next";

const commandToRun =
  process.platform === "win32" ? `"${nextCommand}"` : nextCommand;

const result = spawnSync(commandToRun, ["build"], {
  env: {
    ...process.env,
    STATIC_EXPORT: "true",
    NEXT_PUBLIC_STATIC_EXPORT: "true",
  },
  shell: process.platform === "win32",
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

// Genera automaticamente out/contact.php e out/api/contact/index.php
const outDir = resolve(process.cwd(), "out");
if (existsSync(outDir)) {
  const phpCode = generateContactPhp({
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPass,
    contactEmailTo,
    contactEmailFrom,
  });

  const rootPhpPath = join(outDir, "contact.php");
  writeFileSync(rootPhpPath, phpCode, "utf-8");

  const apiContactDir = join(outDir, "api", "contact");
  mkdirSync(apiContactDir, { recursive: true });
  writeFileSync(
    join(apiContactDir, "index.php"),
    "<?php\nrequire_once __DIR__ . '/../../contact.php';\n",
    "utf-8"
  );

  console.log("\n✓ Generato out/contact.php e out/api/contact/index.php per il server ufficiale.");
  console.log(`  → Destinatario configurato (CONTACT_EMAIL_TO): ${contactEmailTo}`);
  console.log(`  → Mittente configurato (CONTACT_EMAIL_FROM): ${contactEmailFrom}\n`);
}
