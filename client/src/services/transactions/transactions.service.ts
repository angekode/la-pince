/**
 * transactions.service.ts
 * ------------------------------------------------------------
 * Ce fichier regroupe toutes les fonctions permettant de
 * communiquer avec l’API concernant les transactions.
 *
 * Chaque fonction correspond à un endpoint backend.
 * Les commentaires expliquent clairement le rôle de chaque ligne.
 */

import axios from "axios"; // Client HTTP utilisé pour appeler l’API

// URL de base de l’API (définie dans .env ou configuration globale)
const API_URL = import.meta.env.VITE_API_URL;

/**
 * ------------------------------------------------------------
 * Récupère toutes les transactions de l’utilisateur connecté.
 * ------------------------------------------------------------
 */
export async function getTransactions() {
  // Appel GET vers /transactions
  const response = await axios.get(`${API_URL}/transactions`);

  // Retourne les données reçues depuis le backend
  return response.data;
}

/**
 * ------------------------------------------------------------
 * Crée une nouvelle transaction.
 * @param transactionData - données envoyées au backend
 * ------------------------------------------------------------
 */
export async function createTransaction(transactionData: any) {
  // Appel POST vers /transactions avec les données du formulaire
  const response = await axios.post(`${API_URL}/transactions`, transactionData);

  // Retourne la transaction créée
  return response.data;
}

/**
 * ------------------------------------------------------------
 * Supprime une transaction par son ID.
 * @param id - identifiant de la transaction
 * ------------------------------------------------------------
 */
export async function deleteTransaction(id: number) {
  // Appel DELETE vers /transactions/:id
  const response = await axios.delete(`${API_URL}/transactions/${id}`);

  // Retourne la réponse du backend (souvent un message de succès)
  return response.data;
}

/**
 * ------------------------------------------------------------
 * Met à jour une transaction existante.
 * @param id - identifiant de la transaction
 * @param updatedData - données modifiées
 * ------------------------------------------------------------
 */
export async function updateTransaction(id: number, updatedData: any) {
  // Appel PATCH vers /transactions/:id avec les nouvelles données
  const response = await axios.patch(
    `${API_URL}/transactions/${id}`,
    updatedData
  );

  // Retourne la transaction mise à jour
  return response.data;
}


