/**
 * categories.service.ts
 * ------------------------------------------------------------
 * Ce fichier regroupe toutes les fonctions permettant de
 * communiquer avec l’API concernant les catégories.
 *
 * Chaque fonction correspond à un endpoint backend.
 * Les commentaires expliquent clairement le rôle de chaque ligne.
 */

import axios from "axios"; // Client HTTP utilisé pour appeler l’API

// URL de base de l’API (définie dans .env ou configuration globale)
const API_URL = import.meta.env.VITE_API_URL;

/**
 * ------------------------------------------------------------
 * Récupère toutes les catégories disponibles.
 * ------------------------------------------------------------
 */
export async function getCategories() {
  // Appel GET vers /categories
  const response = await axios.get(`${API_URL}/categories`);

  // Retourne les données reçues depuis le backend
  return response.data;
}

/**
 * ------------------------------------------------------------
 * Crée une nouvelle catégorie.
 * @param categoryData - données envoyées au backend
 * ------------------------------------------------------------
 */
export async function createCategory(categoryData: any) {
  // Appel POST vers /categories avec les données du formulaire
  const response = await axios.post(`${API_URL}/categories`, categoryData);

  // Retourne la catégorie créée
  return response.data;
}

/**
 * ------------------------------------------------------------
 * Supprime une catégorie par son ID.
 * @param id - identifiant de la catégorie
 * ------------------------------------------------------------
 */
export async function deleteCategory(id: number) {
  // Appel DELETE vers /categories/:id
  const response = await axios.delete(`${API_URL}/categories/${id}`);

  // Retourne la réponse du backend (souvent un message de succès)
  return response.data;
}

/**
 * ------------------------------------------------------------
 * Met à jour une catégorie existante.
 * @param id - identifiant de la catégorie
 * @param updatedData - données modifiées
 * ------------------------------------------------------------
 */
export async function updateCategory(id: number, updatedData: any) {
  // Appel PATCH vers /categories/:id avec les nouvelles données
  const response = await axios.patch(
    `${API_URL}/categories/${id}`,
    updatedData
  );

  // Retourne la catégorie mise à jour
  return response.data;
}




