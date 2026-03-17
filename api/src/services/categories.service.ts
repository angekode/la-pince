import { prisma } from "../db/prisma-client.js";
import type { CreateCategoryInput, UpdateCategoryInput } from "../validations/category.schema.js";

// ---------------------------------------------------------
// SERVICE : RÉCUPÉRER TOUTES LES CATÉGORIES D'UN UTILISATEUR
// ---------------------------------------------------------
export const findAll = (userId: number) => {
  return prisma.category.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });
};

// ---------------------------------------------------------
// SERVICE : RÉCUPÉRER UNE CATÉGORIE PAR ID
// ---------------------------------------------------------
export const findById = (id: number, userId: number) => {
  return prisma.category.findFirst({
    where: { id, userId },
  });
};

// ---------------------------------------------------------
// SERVICE : CRÉER UNE CATÉGORIE
// ---------------------------------------------------------
export const create = (userId: number, data: CreateCategoryInput) => {
  return prisma.category.create({
    data: {
      ...data,
      userId,
    },
  });
};

// ---------------------------------------------------------
// SERVICE : METTRE À JOUR UNE CATÉGORIE
// ---------------------------------------------------------
export const update = (id: number, userId: number, data: UpdateCategoryInput) => {
  return prisma.category.updateMany({
    where: { id, userId },
    data,
  });
};

// ---------------------------------------------------------
// SERVICE : SUPPRIMER UNE CATÉGORIE
// ---------------------------------------------------------
export const remove = (id: number, userId: number) => {
  return prisma.category.deleteMany({
    where: { id, userId },
  });
};
