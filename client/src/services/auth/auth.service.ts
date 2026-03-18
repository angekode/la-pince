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


export async function loginUser(payload: { email: string; password: string }) {
  console.log(`${import.meta.env.VITE_API_BASE_URL}/auth/login`);
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",  //  reception cookie par le navigateur
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur login");
  }

  return data;
}


export async function getMe() {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Non authentifié");
  }

  return data;
}