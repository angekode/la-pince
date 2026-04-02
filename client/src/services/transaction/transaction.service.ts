const TRANSACTIONS_URL = `${import.meta.env.VITE_API_BASE_URL}/transactions`;

// ================= GET =================

export type Transaction = {
  id: number;
  label: string;
  amount: number;
  date: string;
  categoryId: number;
  userId: number;
  description: number;
};

export type GetTransactionsResponse = {
  count: number;
  transactions: Transaction[];
};


export async function getTransactions() {
  const res = await fetch(TRANSACTIONS_URL, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("GET ERROR:", data);
    throw new Error(
      data?.message ||
      data?.error ||
      "Erreur récupération transactions"
    );
  }

  return data;
}

// ================= POST =================
export async function createTransaction(data: {
  categoryId: number;
  amount: number;
  label: string;
  date: string;
}) {
  const res = await fetch(TRANSACTIONS_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
  ...data,
  label: data.label || "Dépense", // ✅ FIX ICI
}),
  });

  const responseData: any = await res.json();
  console.log('iciii', responseData);

  if (!res.ok) {
    console.error("POST ERROR:", responseData);

    throw new Error(
      responseData?.message ||
      responseData?.error ||
      JSON.stringify(responseData)
    );
  }

  return responseData;
}

// ================= DELETE =================
export async function deleteTransaction(id: number) {
  const res = await fetch(`${TRANSACTIONS_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  let data = null;

  try {
    data = await res.json();
  } catch {
    // cas 204 no content
  }

  if (!res.ok) {
    console.error("DELETE ERROR:", data);
    throw new Error(
      data?.message ||
      data?.error ||
      "Erreur suppression transaction"
    );
  }

  return data;
}

// PATCH
export async function updateTransaction(id: number, data: any) {
  const res = await fetch(`${TRANSACTIONS_URL}/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
  ...data,
  label: data.label || "Dépense", // ✅ FIX ICI
}),
  });

  if (!res.ok) {
    throw new Error("Erreur update transaction");
  }

  return res.json();
}