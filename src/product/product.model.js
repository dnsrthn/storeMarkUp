import { Schema, model } from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productName
 *         - productDescription
 *         - price
 *         - category
 *       properties:
 *         productName:
 *           type: string
 *           description: The name of the product
 *           maxLength: 50
 *         productDescription:
 *           type: string
 *           description: The description of the product
 *           maxLength: 200
 *         price:
 *           type: number
 *           description: The price of the product
 *           minimum: 1
 *         stock:
 *           type: number
 *           description: The stock quantity of the product
 *         category:
 *           type: string
 *           description: The category ID of the product
 *         productImage:
 *           type: string
 *           description: The URL of the product image
 *         sales:
 *           type: number
 *           description: The number of sales of the product
 *           default: 0
 *         status:
 *           type: boolean
 *           description: The status of the product
 *           default: true
 *       example:
 *         productName: "Sample Product"
 *         productDescription: "This is a sample product description."
 *         price: 10
 *         stock: 100
 *         category: "60d0fe4f5311236168a109ca"
 *         productImage: "http://example.com/image.jpg"
 *         sales: 0
 *         status: true
 */
const productSchema = new Schema({
    productName:{
        type: String,
        required: [true, "Produt Name is required"],
        maxLength: [50, "Product Name cannot exceed 50 characters"]
    },
    productDescription:{
        type: String,
        required: [true, "Product Dexcription is requres"],
        maxLength: [200, "Product description cannot exceed 200 characters"]
    },
    price:{
        type: Number,
        required: [true, "Price is required"],
        min: [1, "Price cannot be less than 1"]
    },
    stock:{
        type: Number
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    productImage:{
        type:String
    },
    sales: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    },
},{
    timestamps: true,
    versionKey: false
});

export default model('Product', productSchema);