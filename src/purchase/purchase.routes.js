import { Router } from "express"
import {  history, purchase } from "./purchase.controller.js"
import { historyValidator, purchaseValidator } from "../middlewares/purchases-validator.js"

const router = Router()


/**
 * @swagger
 * /purchase:
 *   post:
 *     summary: Create a new purchase
 *     tags: [Purchase]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: The ID of the item to purchase
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the item to purchase
 *     responses:
 *       200:
 *         description: Purchase created successfully
 *       400:
 *         description: Invalid input
 * /history:
 *   get:
 *     summary: Get purchase history
 *     tags: [Purchase]
 *     responses:
 *       200:
 *         description: A list of purchases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   itemId:
 *                     type: string
 *                     description: The ID of the item purchased
 *                   quantity:
 *                     type: integer
 *                     description: The quantity of the item purchased
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date of the purchase
 *       400:
 *         description: Invalid input
 */

router.post("/purchase", purchaseValidator, purchase)
router.get("/history", historyValidator, history)

export default router