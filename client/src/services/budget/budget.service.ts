const BUDGET_URL = `${import.meta.env.VITE_API_BASE_URL}/budgets`;

// GET

export type Budget = {
  id: number;
  limit: number;
  category: string;
  alertEnabled: boolean;
};

export type GetBudgetsResponse = {
  count: number,
  budgets: Budget[]
};

export async function getBudgets():Promise<GetBudgetsResponse> {
  const res = await fetch(BUDGET_URL, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Erreur budgets");
  }

  return data;
}

// POST
export async function createBudget(data: {
  categoryId: number;
  limit: number;
  alertEnabled: boolean; // 🔥 déjà prêt pour backend
}) {
  const res = await fetch(BUDGET_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.error || "Erreur création budget");
  }

  return json;
}

// DELETE
export async function deleteBudget(id: number) {
  const res = await fetch(`${BUDGET_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Erreur suppression budget");
  }
}