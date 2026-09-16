export const ADMIN_COOKIE_NAME = "admin_session";
export const SESSION_DURATION_SECONDS = 2 * 60 * 60; // 2 ore

export interface AdminSessionPayload {
  username: string;
  role: "admin";
  iat: number;
  exp: number;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function getSecretKeyBytes(): Uint8Array {
  const secret =
    process.env.ADMIN_JWT_SECRET?.trim() ||
    "two_lions_international_executive_suite_jwt_fallback_key_2026";
  return new TextEncoder().encode(secret);
}

async function getCryptoKey(usage: KeyUsage): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    "raw",
    getSecretKeyBytes() as unknown as BufferSource,
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage]
  );
}

export async function createAdminToken(username: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "HS256", typ: "JWT" };
  const payload: AdminSessionPayload = {
    username,
    role: "admin",
    iat: now,
    exp: now + SESSION_DURATION_SECONDS,
  };

  const encodedHeader = base64UrlEncode(
    new TextEncoder().encode(JSON.stringify(header))
  );
  const encodedPayload = base64UrlEncode(
    new TextEncoder().encode(JSON.stringify(payload))
  );
  const dataToSign = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`);

  const key = await getCryptoKey("sign");
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    dataToSign as unknown as BufferSource
  );
  const encodedSignature = base64UrlEncode(new Uint8Array(signatureBuffer));

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

export async function verifyAdminToken(
  token: string
): Promise<AdminSessionPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const dataToVerify = new TextEncoder().encode(
      `${encodedHeader}.${encodedPayload}`
    );
    const signatureBytes = base64UrlDecode(encodedSignature);

    const key = await getCryptoKey("verify");
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes as unknown as BufferSource,
      dataToVerify as unknown as BufferSource
    );

    if (!isValid) return null;

    const payloadJson = new TextDecoder().decode(base64UrlDecode(encodedPayload));
    const payload = JSON.parse(payloadJson) as AdminSessionPayload;

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Confronto stringhe timing-safe
 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
      diff |= a.charCodeAt(i) ^ a.charCodeAt(i);
    }
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Calcola l'hash SHA-256 esadecimale di una password/stringa
 */
export async function hashPasswordSha256(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    data as unknown as BufferSource
  );
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function validateAdminCredentials(
  user: string,
  pass: string
): Promise<{ isValid: boolean; username: string }> {
  // Le credenziali vengono lette unicamente dalle variabili d'ambiente (.env.local o hosting)
  // Nessuna credenziale o password è scritta nel codice sorgente
  const expectedUser = process.env.ADMIN_USERNAME?.trim();
  const expectedHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  const expectedPass = process.env.ADMIN_PASSWORD?.trim();

  // Se l'ambiente non è configurato, rifiuta categoricamente l'accesso
  if (!expectedUser || (!expectedHash && !expectedPass)) {
    console.error(
      "Credenziali admin non configurate nelle variabili d'ambiente (ADMIN_USERNAME e ADMIN_PASSWORD / ADMIN_PASSWORD_HASH)."
    );
    return { isValid: false, username: "" };
  }

  const userMatch = timingSafeEqual(user.trim(), expectedUser);

  let passMatch = false;
  if (expectedHash) {
    // Modalità Hash crittografico (la password reale non esiste nemmeno nelle variabili d'ambiente)
    const inputHash = await hashPasswordSha256(pass);
    passMatch = timingSafeEqual(inputHash.toLowerCase(), expectedHash.toLowerCase());
  } else if (expectedPass) {
    // Modalità standard da variabile d'ambiente privata
    passMatch = timingSafeEqual(pass, expectedPass);
  }

  return {
    isValid: userMatch && passMatch,
    username: expectedUser,
  };
}
