import { API_BASE } from "./config";

async function parseResponse(response: Response) {
  let json: any = null;

  try {
    json = await response.json();
  } catch {
    // Ignore JSON parsing errors and fall back to generic messages.
  }

  if (!response.ok) {
    throw new Error(
      json?.detail ??
      json?.message ??
      `Request failed with status ${response.status}`
    );
  }

  return json;
}

export async function get(path: string) {
  const response = await fetch(`${API_BASE}${path}`);
  return parseResponse(response);
}

export async function post(path: string, body: any) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parseResponse(response);
}