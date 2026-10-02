import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// Carica variabili da .env.local
const envPath = resolve(process.cwd(), ".env.local");
const envVars = {};

if (existsSync(envPath)) {
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      envVars[key] = val;
    }
  }
}

const apiUrl = envVars.OPENCART_API_URL || process.env.OPENCART_API_URL || "https://shop.twolionsinternational.com";
const username = envVars.OPENCART_API_USERNAME || process.env.OPENCART_API_USERNAME;
const key = envVars.OPENCART_API_KEY || process.env.OPENCART_API_KEY;

console.log("\n==============================================");
console.log("   Test Connessione API OpenCart 4");
console.log("==============================================\n");
console.log(`URL Server: ${apiUrl}`);
console.log(`API Username: ${username ? username : "(non impostato)"}`);
console.log(`API Key: ${key ? "•••••••••••• (impostata)" : "(non impostata)"}\n`);

if (!username || !key) {
  console.log("❌ ATTENZIONE: Compila OPENCART_API_USERNAME e OPENCART_API_KEY nel file .env.local per eseguire il test.");
  process.exit(1);
}

async function testConnection() {
  const routesToTest = ["api/account/login", "api/login"];

  for (const route of routesToTest) {
    const targetUrl = `${apiUrl.replace(/\/$/, "")}/index.php?route=${route}`;
    console.log(`Verifica endpoint: ${targetUrl} ...`);

    try {
      const bodyParams = new URLSearchParams();
      bodyParams.append("username", username);
      bodyParams.append("key", key);

      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: bodyParams.toString(),
      });

      const responseText = await response.text();
      let json = null;
      try {
        json = JSON.parse(responseText);
      } catch {
        // Non è json
      }

      console.log(`Status HTTP: ${response.status}`);

      if (json && json.api_token) {
        console.log("\n✅ SUCCESSO! OpenCart ha autenticato le credenziali correttamente!");
        console.log(`Token generato: ${json.api_token.slice(0, 10)}...`);
        console.log("\nLa connessione tra Next.js e OpenCart è ora ATTIVA e funzionante.");
        return;
      } else if (json && json.success) {
        console.log("\n✅ SUCCESSO! Risposta di successo da OpenCart:", json.success);
        return;
      } else if (json && json.error) {
        console.log("\n⚠️ Risposta ricevuta da OpenCart (Errore riportato):", json.error);
      } else {
        console.log("\nRisposta ricevuta dal server:", responseText.slice(0, 250));
      }
    } catch (err) {
      console.error(`Errore di rete su ${targetUrl}:`, err.message);
    }
  }
}

testConnection();
