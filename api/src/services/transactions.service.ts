// Importation de Prisma pour pouvoir interagir avec la base de données
import type { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma-client.js";
import { stripUndefined } from "../utils/optional-objects.ts";

/* ---------------------------------------------------------
   SERVICE : findAll
   → Récupération de toutes les dépenses de l'utilisateur connecté (avec la catégorie incluse)
   --> Récupérer toutes les transactions d'un utilisateur
--------------------------------------------------------- */
export const findAll = (
  userId: number
) => {
  return prisma.expense.findMany({
    // Filtre pour ne récupérer QUE les dépenses de cet utilisateur
    where: { 
      userId 
    },

    // Inclusion de la catégorie pour éviter un second appel
    include: { 
      category: true 
    },

    // Trie par date décroissante (les plus récentes d'abord)
    orderBy: { 
      date: "desc" 
    }
  });
};

/* ---------------------------------------------------------
   SERVICE : findById
   → Je récupère UNE dépense précise appartenant à l'utilisateur
    --> Récupérer une transaction par son ID (en vérifiant qu'elle appartient à l'utilisateur)
--------------------------------------------------------- */
export const findById = (
  id: number, 
  userId: number
) => {
  return prisma.expense.findFirst({
    // Vérification que la dépense appartient bien à cet utilisateur
    where: { 
      id, 
      userId 
    },
    include: { 
      category: true 
    }
  });
};

/* ---------------------------------------------------------
   SERVICE : create
   → Je crée une nouvelle dépense pour l'utilisateur
    --> Créer une transaction
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
      ...data, // Récupération des données validées
      date: new Date(data.date),
      userId   // Ajout de l'id de l'utilisateur connecté
    }
  });
};

/* ---------------------------------------------------------
   SERVICE : update
   → Mise à jour d'une dépense SI elle appartient à l'utilisateur
    --> Mettre à jour une transaction (en vérifiant qu'elle appartient à l'utilisateur)
--------------------------------------------------------- */
export const update = (
  id: number,
  userId: number,
  data: { 
    amount?: number; 
    label?: string; 
    date?: string; 
    categoryId?: number 
  }
) => {
  const cleanedData = stripUndefined(data);

  return prisma.expense.updateMany({
    where: { 
      id, 
      userId 
    },
    data: cleanedData,
  });
};

/* ---------------------------------------------------------
   SERVICE : remove
   → Suppression d'une dépense SI elle appartient à l'utilisateur
    --> Supprimer une transaction (en vérifiant qu'elle appartient à l'utilisateur)
--------------------------------------------------------- */
export const remove = (
  id: number, 
  userId: number
) => {
  return prisma.expense.deleteMany({
    where: { 
      id, userId 
    }
  });
};

