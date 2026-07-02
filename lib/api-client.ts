export class ApiError extends Error {
  status: number;
  code: string;

  constructor(message: string, status: number, code = "ERROR") {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    credentials: "include",
  });

  const data = (await response.json().catch(() => ({}))) as {
    error?: string;
    code?: string;
  };

  if (!response.ok) {
    throw new ApiError(data.error ?? "Request failed", response.status, data.code ?? "ERROR");
  }

  return data as T;
}

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong") {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return fallback;
}
