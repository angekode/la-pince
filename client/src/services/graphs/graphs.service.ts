import zod from "zod";

/**
 * Toutes les fonctions utilisés pour les calculs sur les transactions et les graphs
 */


/**
 * Type Categories
 */
const apiCategoryScheme = zod.object({
  id: zod.number(),
  name: zod.string(),
  userId: zod.number()
});

const apiCategoryBodyScheme = zod.object({
  count: zod.number(),
  categories: zod.array(apiCategoryScheme)
});

type ApiCategory = zod.infer<typeof apiCategoryScheme>;


/**
 * Fait une requête à l'API, et renvoie la liste des catégories
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
  const parsedBody = apiCategoryBodyScheme.parse(responseBody); // le format de l'API est ok ?
  return parsedBody.categories;
}


/**
 * Type Transaction
 */
const apiTransactionScheme = zod.object({
  id: zod.number(),
  label: zod.string(),
  amount: zod.number(),
  date: zod.string(),
  categoryId: zod.number(),
  userId: zod.number(),
  description: zod.string()
});

const apiTransactionBodyScheme = zod.object({
  count: zod.number(),
  transactions: zod.array(apiTransactionScheme)
});

type ApiTransaction = zod.infer<typeof apiTransactionScheme>;


/**
 * Fait une requête à l'API, et renvoie la liste des catégories
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
  const parsedBody = apiTransactionBodyScheme.parse(responseBody); // le format de l'API est ok ?
  return parsedBody.transactions;
}


/**
 * Renvoie le total du solde calculé en faisant la somme de toutes les transactions
 */
export async function getSolde(): Promise<number> {
  const transactions = await getAllTransactions();
  return transactions.reduce((total, transaction) => total += transaction.amount, 0);
}


/**
 * Renvoie une liste qui associe le montant total de chaque catégorie
 */
export type CategoryTotals = {
  category: string;
  total: number;
};

export async function getCategoryTotals(): Promise<CategoryTotals[]> {
  const transactions = await getAllTransactions();
  const categories = await getAllCategories();

  const rawTotals : { category: string, total: number }[] = []; // contiendra le total à retravailler

  // A chaque tour de boucle, ajoute à rawTotals un élément de type : { category: 'ma catégorie', total: 545 } 
  for (const category of categories) {
    rawTotals.push({
      category: category.name,
      total: transactions
        .filter(transaction => transaction.categoryId === category.id) // uniquement les transactions pour la catégorie en cours
        .reduce((total, transaction) => total  += transaction.amount, 0) //calcul du total des transactions
    });
  }

  // rawTotal contient des valeurs négatives pour les dépenses et des valeurs positives
  // On garde uniquement les dépenses et on les passe en positif
  return rawTotals
    .filter(categoryTotal => categoryTotal.total < 0)
    .map(categoryTotal => ({ ...categoryTotal, total: categoryTotal.total *= -1 }));
}




// Format attendu par l'option "series.data" de CurveGraph
export type SoldeEvolution = [number, number][];

/**
 * Renvoie une évolution du solde dans le temps au format exploitable par CurveGraph
 */
export async function getSoldeEvolution(): Promise<SoldeEvolution> {
  const transactions = await getAllTransactions();
  const evolution : SoldeEvolution = [];
  let solde = 0;
  for (const transaction of transactions) {
    solde += transaction.amount;
    evolution.push(
      [
        new Date(transaction.date).getTime(), // Connvertion string => Date => number (pour CurveGraph)
        solde // Cummul des ammounts de chaque transaction
      ]
    );
  }

  // Il faut les ranger dans l'ordre chronologique transaction[0] => la date au format number
  return evolution.toSorted(
    (transaction1, transaction2) => transaction1[0] - transaction2[0] 
  );
}