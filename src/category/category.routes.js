import { Router } from "express"
import { addCategory, deleteCategory, getCategory, updateCategory } from "./category.controller.js"
import { createdCategoryValidator, deleteCategoryValidator, updateCategoryValidator } from "../middlewares/category-validators.js"

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management endpoints
 */

/**
 * @swagger
 * /addCategory:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameCategory:
 *                 type: string
 *               descriptionCategory:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/addCategory", createdCategoryValidator, addCategory)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get a list of categories
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Number of items to return
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Starting index for pagination
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get("/", getCategory)

/**
 * @swagger
 * /updateCategory/{id}:
 *   patch:
 *     summary: Update a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newDescription:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.patch("/updateCategory/:id", updateCategoryValidator, updateCategory)

/**
 * @swagger
 * /deleteCategory/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory)

export default router;