// Ici j'importe Prisma pour pouvoir interagir avec ma base de données
import { prisma } from "../db/prisma-client.js";

/* ---------------------------------------------------------
   SERVICE : findAll
   → Je récupère toutes les dépenses de l'utilisateur connecté
--------------------------------------------------------- */
export const findAll = (userId: number) => {
  return prisma.expense.findMany({
    // Je filtre pour ne récupérer QUE les dépenses de cet utilisateur
    where: { userId },

    // J'inclus la catégorie pour éviter un second appel
    include: { category: true },

    // Je trie par date décroissante (les plus récentes d'abord)
    orderBy: { date: "desc" }
  });
};

/* ---------------------------------------------------------
   SERVICE : findById
   → Je récupère UNE dépense précise appartenant à l'utilisateur
--------------------------------------------------------- */
export const findById = (id: number, userId: number) => {
  return prisma.expense.findFirst({
    // Je vérifie que la dépense appartient bien à cet utilisateur
    where: { id, userId },
    include: { category: true }
  });
};

/* ---------------------------------------------------------
   SERVICE : create
   → Je crée une nouvelle dépense pour l'utilisateur
--------------------------------------------------------- */
export const create = (
  userId: number,
  data: {
    amount: number;
    label: string;
    date: string;
    categoryId: number;
  }
) => {
  return prisma.expense.create({
    data: {
      ...data, // Je récupère les données validées
      userId   // J'ajoute l'id de l'utilisateur connecté
    }
  });
};

/* ---------------------------------------------------------
   SERVICE : update
   → Je mets à jour une dépense SI elle appartient à l'utilisateur
--------------------------------------------------------- */
export const update = (
  id: number,
  userId: number,
  data: {
    amount?: number | undefined;
    label?: string | undefined;
    date?: string | undefined;
    categoryId?: number | undefined;
}

) => {
  return prisma.expense.updateMany({
    // updateMany → évite de modifier une dépense d'un autre utilisateur
    where: { id, userId },
    data
  });
};

/* ---------------------------------------------------------
   SERVICE : remove
   → Je supprime une dépense SI elle appartient à l'utilisateur
--------------------------------------------------------- */
export const remove = (id: number, userId: number) => {
  return prisma.expense.deleteMany({
    where: { id, userId }
  });
};

