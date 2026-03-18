import type {
  RegisterPayload,
  RegisterResponse,
} from "../../types/auth/auth.types";


export async function registerUser(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
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