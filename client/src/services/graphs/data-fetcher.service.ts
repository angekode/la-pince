/**
 * Ce fichier fourni les fonctions qui récupèrent les données de transactions et de catégories 
 * via l'API.
*/

import zod from "zod";


// -------------------------------------------------------------------------------------------------
// Catégories
// -------------------------------------------------------------------------------------------------

// Format d'une ligne category renvoyé par l'API
const apiCategoryScheme = zod.object({
  id: zod.number(),
  name: zod.string()
});
export type ApiCategory = zod.infer<typeof apiCategoryScheme>;

// Format du body renvoyé par la route /categories
const apiCategoryBodyScheme = zod.object({
  count: zod.number(),
  categories: zod.array(apiCategoryScheme)
});


/**
 * Fait une requête à l'API sur la route /categories, et renvoie la liste des catégories
 */
export async function getAllCategories(): Promise<ApiCategory[]> {
  const httpResponse = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/categories`,
    {
      method: "GET",
      credentials: "include"
      /* 
        - Si API et Front sur les mêmes : domaine + protocole + port => token dans les tokens inclus automatiquement
        - Sinon utiliser "credentials: "include" + coté back :
           - Access-Control-Allow-Credentials: true
           - Access-Control-Allow-Origin spécifique (pas *)
           - cookie avec des attributs corrects (SameSite, Secure, etc.)
      */
    }
  );
  if (!httpResponse.ok) {
    throw new Error(`Réponse de l'API avec le code d'erreur : ${httpResponse.status} ${httpResponse.statusText}`);
  }
  const responseBody = await httpResponse.json(); // lance une exception si json invalide
  const parsedBody = apiCategoryBodyScheme.parse(responseBody); // le format de l'API est ok, sinon exception
  return parsedBody.categories;
}


// -------------------------------------------------------------------------------------------------
// Transactions
// -------------------------------------------------------------------------------------------------

// Format d'une ligne transaction renvoyé par l'API
const apiTransactionScheme = zod.object({
  id: zod.number(),
  label: zod.string(),
  amount: zod.number(),
  date: zod.string(),
  categoryId: zod.number(),
  userId: zod.number(),
  description: zod.string()
});
export type ApiTransaction = zod.infer<typeof apiTransactionScheme>;

// Format du body renvoyé par la route /transactions
const apiTransactionBodyScheme = zod.object({
  count: zod.number(),
  transactions: zod.array(apiTransactionScheme)
});


/**
 * Fait une requête à l'API sur la route /transactions, et renvoie la liste des transactions
 */
export async function getAllTransactions(): Promise<ApiTransaction[]> {
  const httpResponse = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/transactions`,
    {
      method: "GET",
      credentials: "include"
    }
  );
    if (!httpResponse.ok) {
    throw new Error(`Réponse de l'API avec le code d'erreur : ${httpResponse.status} ${httpResponse.statusText}`);
  }
  const responseBody = await httpResponse.json(); // lance une exception si json invalide
  const parsedBody = apiTransactionBodyScheme.parse(responseBody); // le format de l'API est ok, sinon exception
  return parsedBody.transactions;
}