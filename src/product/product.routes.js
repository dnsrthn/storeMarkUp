import { Router } from "express"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
import { existingProductValidator, deleteProductValidator, updateProductValidator, getByNameValidator, getSoldOutProductsValidator } from "../middlewares/product-validators.js"
import { addProduct, deleteProduct, getProduct, getProductByCategory, getByName, updateProduct, getSoldOutProducts, getBestSellers } from "./product.controller.js"

const router = Router()

router.post("/addProduct", uploadProfilePicture.single("productImage"), existingProductValidator, addProduct)
/**
 * @swagger
 * /addProduct:
 *   post:
 *     summary: Add a new product
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: productImage
 *         type: file
 *         description: The product image to upload
 *       - in: body
 *         name: product
 *         description: The product to create
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - price
 *           properties:
 *             name:
 *               type: string
 *             price:
 *               type: number
 *     responses:
 *       200:
 *         description: Product added successfully
 *       400:
 *         description: Invalid input
 */
router.get("/findProduct/:nameProduct", getByNameValidator, getByName)
/**
 * @swagger
 * /findProduct/{nameProduct}:
 *   get:
 *     summary: Find a product by name
 *     parameters:
 *       - in: path
 *         name: nameProduct
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the product to find
 *     responses:
 *       200:
 *         description: Product found successfully
 *       404:
 *         description: Product not found
 */
router.get("/productCatalogue/", getProduct)
/**
 * @swagger
 * /productCatalogue:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Internal server error
 */
router.get("/productCatalogue/category/:uid", getProductByCategory)
/**
 * @swagger
 * /productCatalogue/category/{uid}:
 *   get:
 *     summary: Get products by category
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: A list of products by category
 *       404:
 *         description: Category not found
 */
router.get("/souldOutProducts/", getSoldOutProductsValidator, getSoldOutProducts)
/**
 * @swagger
 * /souldOutProducts:
 *   get:
 *     summary: Get sold out products
 *     responses:
 *       200:
 *         description: A list of sold out products
 *       500:
 *         description: Internal server error
 */
router.put("/updateProduct/:uid", updateProductValidator, updateProduct)
/**
 * @swagger
 * /updateProduct/{uid}:
 *   put:
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *       - in: body
 *         name: product
 *         description: The product to update
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             price:
 *               type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
router.delete("/deleteProduct/:uid", deleteProductValidator, deleteProduct)
/**
 * @swagger
 * /deleteProduct/{uid}:
 *   delete:
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
router.get("/BestSellers", getBestSellers)
/**
 * @swagger
 * /BestSellers:
 *   get:
 *     summary: Get best sellers
 *     responses:
 *       200:
 *         description: A list of best sellers
 *       500:
 *         description: Internal server error
 */

export default router