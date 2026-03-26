/**
 * budget.service.ts
 * ------------------------------------------------------------
 * Ce fichier regroupe toutes les fonctions permettant de
 * communiquer avec l’API concernant les budgets.
 *
 * Chaque fonction correspond à un endpoint backend.
 * Les commentaires expliquent clairement le rôle de chaque ligne.
 */

import axios from "axios"; // Client HTTP utilisé pour appeler l’API

// URL de base de l’API (définie dans .env ou configuration globale)
const API_URL = import.meta.env.VITE_API_URL;

/**
 * ------------------------------------------------------------
 * Récupère tous les budgets existants.
 * ------------------------------------------------------------
 */
export async function getBudgets() {
  // Appel GET vers /budgets
  const response = await axios.get(`${API_URL}/budgets`);

  // Retourne les données reçues depuis le backend
  return response.data;
}

/**
 * ------------------------------------------------------------
 * Crée un nouveau budget.
 * @param budgetData - données envoyées au backend
 * ------------------------------------------------------------
 */
export async function createBudget(budgetData: any) {
  // Appel POST vers /budgets avec les données du formulaire
  const response = await axios.post(`${API_URL}/budgets`, budgetData);

  // Retourne le budget créé
  return response.data;
}

/**
 * ------------------------------------------------------------
 * Supprime un budget par son ID.
 * @param id - identifiant du budget
 * ------------------------------------------------------------
 */
export async function deleteBudget(id: number) {
  // Appel DELETE vers /budgets/:id
  const response = await axios.delete(`${API_URL}/budgets/${id}`);

  // Retourne la réponse du backend (souvent un message de succès)
  return response.data;
}

/**
 * ------------------------------------------------------------
 * Met à jour un budget existant.
 * @param id - identifiant du budget
 * @param updatedData - données modifiées
 * ------------------------------------------------------------
 */
export async function updateBudget(id: number, updatedData: any) {
  // Appel PATCH vers /budgets/:id avec les nouvelles données
  const response = await axios.patch(
    `${API_URL}/budgets/${id}`,
    updatedData
  );

  // Retourne le budget mis à jour
  return response.data;
}



