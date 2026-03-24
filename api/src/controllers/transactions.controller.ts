// ---------------------------------------------------------
// CONTROLLER DES TRANSACTIONS
// ---------------------------------------------------------
// Ici je gère toute la logique "HTTP" :
// - lecture des données envoyées par le client / récupèration des données de la requête
// - validation via Zod
// - appel des services (qui interagissent avec la DB)
// - renvoie d'une réponse propre au client

import type { Request, Response } from "express";

// Fonction utilitaire pour retirer les champs undefined (utile pour PATCH)
import { stripUndefined } from "../utils/optional-objects.ts";

// ❌ Ancien import direct de Prisma (je le garde en commentaire)
// import { prisma } from "../db/prisma-client.js";

// ✔️ Import de toutes les fonctions CRUD du services transactions.service (findAll, findById, create, update, remove)
import {
  findAll,
  findById,
  create,
  update,
  remove
} from "../services/transactions.service.js";

// ✔️ Import des schémas Zod pour valider les données reçues dans les requêtes (createTransactionSchema, updateTransactionSchema)
import {
  createTransactionSchema,
  updateTransactionSchema
} from "../validations/transaction.schema.js";
import { parse } from "node:path";

// ---------------------------------------------------------
// GET /transactions
// ---------------------------------------------------------

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    // Le middleware Auth a injecté req.user.id
    const userId = req.user!.id;

    // Récupération de toutes les transactions de l'utilisateur via mon service
    const transactions = await findAll(userId);

    // Réponse structurée : renvoie d'une réponse propre, avec un count
    return res.status(200).json({
      count: transactions.length,
      transactions
    });

  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// ---------------------------------------------------------
// GET /transactions/:id
// ---------------------------------------------------------

// Ancienne version 
/*
export const getTransactionById = async (req: Request, res: Response) => {
  try {
    // TODO: à faire plus tard
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
*/

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user!.id;

    const transaction = await findById(id, userId);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    return res.status(200).json(transaction);

  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// ---------------------------------------------------------
// POST /transactions
// ---------------------------------------------------------
// Ancienne version 
/*
export const createTransaction = async (req: Request, res: Response) => {
  try {
    // TODO: à faire plus tard
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
*/

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    // Validation des données envoyées par le client
    const parsed = createTransactionSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    // Création de la transaction via le service
    const newTransaction = await create(userId, parsed.data);

    return res.status(201).json(newTransaction);

  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// ---------------------------------------------------------
// PATCH /transactions/:id
// ---------------------------------------------------------

// Ancienne version 
/*
export const updateTransaction = async (req: Request, res: Response) => {
  try {
    // TODO: à faire plus tard
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
*/

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user!.id;

    // Validation des données partiellement (PATCH)
    const parsed = updateTransactionSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }
    // Supprimer les champs undefined pour ne pas écraser les données existantes
    const cleanedData = stripUndefined(parsed.data);
    const result = await update(id, userId, cleanedData);

    if (result.count === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    return res.status(200).json({ message: "Transaction updated" });

  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// ---------------------------------------------------------
// DELETE /transactions/:id
// ---------------------------------------------------------

// Ancienne version 
/*
export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    // TODO: à faire plus tard
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
*/

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user!.id;

    const result = await remove(id, userId);

    if (result.count === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    return res.status(200).json({ message: "Transaction deleted" });

  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
