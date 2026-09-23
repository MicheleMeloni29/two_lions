// Two Lions International - Client-side Admin Authentication Utility
// Safe for static exports and server environments

const SESSION_STORAGE_KEY = "tl_admin_session";
const AUTH_SALT = "two_lions_executive_salt_2026";

// Hash SHA-256 pre-calcolato per la password predefinita (salata)
// Password: process.env.ADMIN_PASSWORD (in .env.local) + AUTH_SALT
const DEFAULT_EXPECTED_HASH = "e01023220d8280d02bf7c9e0d9cb5af19c105bfdbc2dcfd2c48ffa96891917d0";
const DEFAULT_EXPECTED_USER = "admin";

/**
 * Calcola l'hash crittografico SHA-256 di una stringa con salt usando Web Crypto API.
 */
export async function hashPasswordWithSalt(password: string): Promise<string> {
  const salted = password + AUTH_SALT;
  const encoder = new TextEncoder();
  const data = encoder.encode(salted);

  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  // Fallback per ambienti Node.js (es. build time o test)
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createHash } = require("crypto");
    return createHash("sha256").update(salted).digest("hex");
  } catch {
    return "";
  }
}

/**
 * Verifica se le credenziali inserite corrispondono a quelle autorizzate.
 */
export async function verifyAdminCredentials(
  user: string,
  pass: string
): Promise<boolean> {
  const expectedUser =
    process.env.NEXT_PUBLIC_ADMIN_USERNAME?.trim() || DEFAULT_EXPECTED_USER;
  const expectedHash =
    process.env.NEXT_PUBLIC_ADMIN_HASH?.trim() || DEFAULT_EXPECTED_HASH;

  if (user.trim().toLowerCase() !== expectedUser.toLowerCase()) {
    return false;
  }

  const computedHash = await hashPasswordWithSalt(pass.trim());
  return computedHash.toLowerCase() === expectedHash.toLowerCase();
}

export interface AdminClientSession {
  authenticated: boolean;
  username: string;
  createdAt: number;
}

/**
 * Salva la sessione attiva in sessionStorage.
 */
export function setAdminSession(username: string): void {
  if (typeof window === "undefined") return;

  const session: AdminClientSession = {
    authenticated: true,
    username: username.trim(),
    createdAt: Date.now(),
  };

  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (err) {
    console.error("Impossibile salvare la sessione in sessionStorage:", err);
  }
}

/**
 * Verifica se esiste una sessione attiva e valida in sessionStorage.
 */
export function isValidAdminSession(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return false;

    const session = JSON.parse(raw) as AdminClientSession;
    if (!session || !session.authenticated || !session.username) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Elimina la sessione attiva in sessionStorage.
 */
export function clearAdminSession(): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (err) {
    console.error("Impossibile rimuovere la sessione:", err);
  }
}
