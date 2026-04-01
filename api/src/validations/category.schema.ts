import { z } from "zod";

// ---------------------------------------------------------
// SCHEMA POUR LA CREATION D'UNE CATEGORIE
// ---------------------------------------------------------
export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom est trop long"),
  colorCode: z.string()
});

// ---------------------------------------------------------
// SCHEMA POUR LA MISE À JOUR D'UNE CATEGORIE (PATCH)
// ---------------------------------------------------------
export const updateCategorySchema = z.object({
  name: z.string().min(2).max(50).optional(),
  colorCode: z.string().optional()
});

// Types dérivés automatiquement des schémas Zod
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
