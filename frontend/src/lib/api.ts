const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:3000";

export function getCookie(name: string): string | null {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1] ?? null
  );
}

function csrfHeaders(): HeadersInit {
  const token = getCookie("csrf_token");
  return token ? { "X-CSRF-Token": token } : {};
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function handle<T>(res: Response): Promise<T> {
  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // ignore
  }
  if (!res.ok) {
    const msg = data?.error_message ?? `Request failed (${res.status})`;
    throw new ApiError(msg, res.status);
  }
  return data as T;
}

export const api = {
  // ---------- Auth ----------
  login(password: string) {
    return fetch(`${API_URL}/api/auth`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }).then((r) => handle<{ status: true }>(r));
  },

  // ---------- Public ----------
  badusbHit(sub: string) {
    return fetch(`${API_URL}/api/badusb-hit/${encodeURIComponent(sub)}`, {
      method: "POST",
      credentials: "include",
    }).then((r) => handle<{ status: true }>(r));
  },

  submitQuestionnaire(sub: string, payload: QuestionnairePayload) {
    return fetch(`${API_URL}/api/questionnaire/${encodeURIComponent(sub)}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((r) => handle<{ status: true; sub: string }>(r));
  },

  // ---------- Dashboard ----------
  getStats() {
    return fetch(`${API_URL}/api/dashboard/stats`, {
      credentials: "include",
    }).then((r) =>
      handle<{
        status: true;
        badusb_total: number;
        badusb_plugged: number;
        questionnaire_answers: number;
      }>(r),
    );
  },

  listBadusb() {
    return fetch(`${API_URL}/api/dashboard/badusb`, {
      credentials: "include",
    }).then((r) => handle<{ status: true; badusb_list: BadUSB[] }>(r));
  },

  createBadusb(name: string, drop_location?: string) {
    return fetch(`${API_URL}/api/dashboard/badusb/create`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", ...csrfHeaders() },
      body: JSON.stringify({ name, drop_location: drop_location ?? "" }),
    }).then((r) => handle<BadUSB>(r));
  },

  deleteBadusb(sub: string) {
    return fetch(`${API_URL}/api/dashboard/badusb/delete/${encodeURIComponent(sub)}`, {
      method: "DELETE",
      credentials: "include",
      headers: { ...csrfHeaders() },
    }).then((r) => handle<{ status: true }>(r));
  },

  listQuestionnaire() {
    return fetch(`${API_URL}/api/dashboard/questionnaire`, {
      credentials: "include",
    }).then((r) =>
      handle<{ status: true; questionnaire_list: Questionnaire[] }>(r),
    );
  },

  deleteQuestionnaire(sub: string) {
    return fetch(`${API_URL}/api/dashboard/questionnaire/delete/${encodeURIComponent(sub)}`, {
      method: "DELETE",
      credentials: "include",
      headers: { ...csrfHeaders() },
    }).then((r) => handle<{ status: true }>(r));
  },
};

// ---------- Types ----------
export interface BadUSB {
  sub: string;
  name: string;
  drop_location: string | null;
  status: 0 | 1;
}

export interface Questionnaire {
  sub: string;
  badusb_sub: string;
  email: string | null;
  location_found: string;
  insertion_reason: 0 | 1 | 2 | 3 | 4;
  comfort_rating: 0 | 1 | 2 | 3 | 4;
  malicious: boolean;
}

export interface QuestionnairePayload {
  badusb_sub: string;
  email: string;
  location_found: string;
  insertion_reason: number;
  comfort_rating: number;
  malicious: boolean;
}

export const INSERTION_REASONS = [
  "Curiosity",
  "Altruism (wanted to return it to its owner)",
  "Personal gain",
  "Professional context",
  "To reuse the drive",
] as const;

export const COMFORT_LABELS = [
  "Very uncomfortable",
  "Uncomfortable",
  "Neutral",
  "Comfortable",
  "Very comfortable",
] as const;