// ---------------------------------------------------------
// CONTROLLER DES TRANSACTIONS
// ---------------------------------------------------------
// Ici je gère toute la logique "HTTP" :
// - je récupère les données de la requête
// - je valide (Zod)
// - j'appelle les services (qui parlent à la DB)
// - je renvoie une réponse propre au client

import type { Request, Response } from "express";

// ❌ Ancien import direct de Prisma (je le garde en commentaire)
// import { prisma } from "../db/prisma-client.js";

// ✔️ J'importe maintenant TOUS mes services CRUD
import {
  findAll,
  findById,
  create,
  update,
  remove
} from "../services/transactions.service.js";

// ✔️ J'importe mes schémas Zod pour valider les données
import {
  createTransactionSchema,
  updateTransactionSchema
} from "../validations/transaction.schema.js";


// ---------------------------------------------------------
// GET /transactions
// ---------------------------------------------------------
export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    // le middleware Auth a mis req.user.id
    const userId = req.user!.id;

    // J'appelle mon service pour récupérer toutes les transactions
    const transactions = await findAll(userId);

    // Je renvoie une réponse propre, avec un count
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
// Ancienne version (je la garde en commentaire)
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
// Ancienne version (je la garde en commentaire)
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

    // Je valide les données envoyées par le client
    const parsed = createTransactionSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    // Je crée la transaction via mon service
    const newTransaction = await create(userId, parsed.data);

    return res.status(201).json(newTransaction);

  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};


// ---------------------------------------------------------
// PATCH /transactions/:id
// ---------------------------------------------------------
// Ancienne version (je la garde en commentaire)
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

    // Je valide les données partiellement (PATCH)
    const parsed = updateTransactionSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const result = await update(id, userId, parsed.data);

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
// Ancienne version (je la garde en commentaire)
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
