import { API_URL } from "../config";

export async function fetchLogin(form) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await response.json();
  return { status: response.status, data };
}
