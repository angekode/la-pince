import { Router } from "express";
import { authMiddleware} from "../middlewares/auth.middleware.js";
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from "../controllers/transactions.controller.js";

const router = Router();

router.get("/", authMiddleware, getAllTransactions);
router.get("/:id", authMiddleware, getTransactionById);
router.post("/", authMiddleware, createTransaction);
router.patch("/:id", authMiddleware, updateTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;
