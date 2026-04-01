const CATEGORY_URL = `${import.meta.env.VITE_API_BASE_URL}/categories`;

export type Category = {
  id: number;
  name: string;
  colorCode: string;
};

export type GetCategoriesResponse = {
  count: number;
  categories: Category[];
};

// GET
export async function getCategories(): Promise<GetCategoriesResponse> {
  const res = await fetch(CATEGORY_URL, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Erreur récupération catégories");
  }

  return res.json();
}

// POST
export async function createCategory(name: string): Promise<Category> {
  const res = await fetch(CATEGORY_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error("Erreur création catégorie");
  }

  return res.json();
}

// DELETE
export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`${CATEGORY_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Erreur suppression catégorie");
  }
}