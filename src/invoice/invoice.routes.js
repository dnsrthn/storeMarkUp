import { Router } from 'express'
import { getInvoiceByUserValidator, updateInvoiceValidator } from '../middlewares/invoice-validator.js'
import { updateInvoice, getInvoiceByUser } from './invoice.controller.js'

const router = Router()
/**
 * @swagger
 * /updateInvoice/{id}:
 *   put:
 *     summary: Update an invoice
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The invoice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Invoice not found
 * 
 * /invoices:
 *   get:
 *     summary: Get invoices by user
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   status:
 *                     type: string
 *                   amount:
 *                     type: number
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Invoices not found
 */

router.put("/updateInvoice/:id", updateInvoiceValidator, updateInvoice)

router.get("/invoices", getInvoiceByUserValidator, getInvoiceByUser)

export default router