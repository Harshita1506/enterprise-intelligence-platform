const API_BASE = "http://127.0.0.1:8000";

export async function get(path: string) {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}

export async function post(path: string, body: any) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}