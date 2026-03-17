import type {
  RegisterPayload,
  RegisterResponse,
} from "../../types/auth/auth.types";

const API_BASE_URL = "http://localhost:8000";

export async function registerUser(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data: RegisterResponse | { message?: string } = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message || "Une erreur est survenue lors de l'inscription."
    );
  }

  return data;
}