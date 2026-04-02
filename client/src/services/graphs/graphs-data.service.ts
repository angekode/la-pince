/**
 * Fourni des fonctions qui renvoie des données utilisées par les composants qui affichent les
 * graphiques (BarGraph, CurveGraph, PieGraph...).
 *
 * Les fonctions qui finissent par ForXXXGraphData renvoient des données au format attendu par
 * l'option HighchartsOptionsType.series.data des différents graph.
 */

import { getAllCategories, getAllTransactions } from "./data-fetcher.service";
import { type Category } from "../category/category.service";
import { type Transaction } from "../transaction/transaction.service";

/**
 * Renvoie le total du solde calculé en faisant la somme de toutes les transactions
 */
export async function getSolde(): Promise<number> {
  const transactions = await getAllTransactions();
  return transactions.reduce(
    (total, transaction) => (total += transaction.amount),
    0,
  );
}

/**
 * Renvoie une liste qui associe le montant total de chaque catégorie
 */
export type CategoryTotalsData = {
  category: string;
  total: number;
};

export async function getCategoryTotalsForPieGraphData(
  categories: Category[],
  transactions: Transaction[],
): Promise<CategoryTotalsData[]> {
  const rawTotals: { category: string; total: number }[] = []; // contiendra le total à retravailler

  // A chaque tour de boucle, ajoute à rawTotals un élément de type : { category: 'ma catégorie', total: 545 }
  for (const category of categories) {
    rawTotals.push({
      category: category.name,
      total: transactions
        .filter((transaction) => transaction.categoryId === category.id) // uniquement les transactions pour la catégorie en cours
        .reduce((total, transaction) => (total += transaction.amount), 0), //calcul du total des transactions
    });
  }

  // rawTotal contient des valeurs négatives pour les dépenses et des valeurs positives
  // On garde uniquement les dépenses et on les passe en positif
  return rawTotals
    .filter((categoryTotal) => categoryTotal.total < 0)
    .map((categoryTotal) => ({
      ...categoryTotal,
      total: (categoryTotal.total *= -1),
    }));
}

// Format attendu par l'option "series.data" de CurveGraph
export type SoldeEvolutionData = [number, number][];

/**
 * Renvoie une évolution du solde dans le temps au format exploitable par CurveGraph
 */
export async function getSoldeEvolutionForCurveGraphData(
  transactions: Transaction[]
): Promise<SoldeEvolutionData> {

  const evolution: SoldeEvolutionData = [];
  let solde = 0;
  for (const transaction of transactions) {
    solde += transaction.amount;
    evolution.push([
      new Date(transaction.date).getTime(), // Connvertion string => Date => number (pour CurveGraph)
      solde, // Cummul des ammounts de chaque transaction
    ]);
  }

  // Il faut les ranger dans l'ordre chronologique transaction[0] => la date au format number
  return evolution.toSorted(
    (transaction1, transaction2) => transaction1[0] - transaction2[0],
  );
}
