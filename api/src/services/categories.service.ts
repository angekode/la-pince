import { prisma } from "../db/prisma-client.js";
import type { CreateCategoryInput, UpdateCategoryInput } from "../validations/category.schema.js";
import { stripUndefined } from "../utils/optional-objects.ts";

// ---------------------------------------------------------
// SERVICE : RÉCUPÉRER TOUTES LES CATÉGORIES D'UN UTILISATEUR
// ---------------------------------------------------------

export const findAll = () => {
  return prisma.category.findMany({
    where: {},
    orderBy: { name: "asc" },
  });
};

// ---------------------------------------------------------
// SERVICE : RÉCUPÉRER UNE CATÉGORIE PAR ID (sécurisé par userId)
// ---------------------------------------------------------

export const findById = (id: number) => {
  return prisma.category.findFirst({
    where: { id },
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
  const cleanedData = stripUndefined(data);
  if (data.name) {
    return prisma.category.updateMany({
      where: { id, userId },
      data: cleanedData,
    });
  }
};

// ---------------------------------------------------------
// SERVICE : SUPPRIMER UNE CATÉGORIE
// ---------------------------------------------------------
export const remove = (id: number, userId: number) => {
  return prisma.category.deleteMany({
    where: { id, userId },
  });
};
