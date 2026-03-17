import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";

import {
  findAll,
  findById,
  create,
  update,
  remove,
} from "../services/categories.service.js";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/category.schema.js";

// ---------------------------------------------------------
// GET /categories
// ---------------------------------------------------------
export const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const categories = await findAll(userId);

    return res.status(200).json({
      count: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// ---------------------------------------------------------
// GET /categories/:id
// ---------------------------------------------------------
export const getCategoryById = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user!.id;

    const category = await findById(id, userId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// ---------------------------------------------------------
// POST /categories
// ---------------------------------------------------------
export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const parsed = createCategorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const newCategory = await create(userId, parsed.data);
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// ---------------------------------------------------------
// PATCH /categories/:id
// ---------------------------------------------------------
export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user!.id;

    const parsed = updateCategorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const result = await update(id, userId, parsed.data);

    if (result.count === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json({ message: "Category updated" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// ---------------------------------------------------------
// DELETE /categories/:id
// ---------------------------------------------------------
export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user!.id;

    const result = await remove(id, userId);

    if (result.count === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
