// J'importe Zod pour valider mes données avant de toucher à la base
import { z } from "zod";

/* ---------------------------------------------------------
   SCHEMA : createTransactionSchema
   → Definir ce qu'une transaction valide DOIT contenir
--------------------------------------------------------- */
export const createTransactionSchema = z.object({
  amount: z.number().positive(),         // Le montant doit être un nombre positif
  label: z.string().min(1),              // Le label doit être une chaîne non vide
  date: z.string().datetime(),           // La date doit être un ISO datetime valide
  categoryId: z.number().int().positive()// L'id de catégorie doit être un entier positif
});

/* ---------------------------------------------------------
   SCHEMA : updateTransactionSchema
   → Même structure que create, mais tout devient optionnel
--------------------------------------------------------- */
export const updateTransactionSchema = createTransactionSchema.partial();
