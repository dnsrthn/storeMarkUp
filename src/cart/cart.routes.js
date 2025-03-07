import { Router } from "express"

import { addToCart, getCart, deleteFromCart } from "./cart.controller.js"
import { addToCartValidator, getCartValidator, deleteFromCartvValidator } from "../middlewares/cart-validator.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management endpoints
 */

/**
 * @swagger
 * /addProductCart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/addProductCart", addToCartValidator, addToCart)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get the contents of the cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart contents retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get("/", getCartValidator, getCart)

/**
 * @swagger
 * /deleteFromCart:
 *   delete:
 *     summary: Delete a product from the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product deleted from cart successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteFromCart", deleteFromCartvValidator, deleteFromCart)

export default router