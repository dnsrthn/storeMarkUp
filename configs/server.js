import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import categoryRoutes from "../src/category/category.routes.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import productRoutes from "../src/product/product.routes.js"
import cartRoutes from "../src/cart/cart.routes.js"
import purchaseRoutes from "../src/purchase/purchase.routes.js"
import invoiceRoutes from "../src/invoice/invoice.routes.js"
import { swaggerDocs, swaggerUi } from "./swagger.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/storeMarkUpA/v1/admin/category", categoryRoutes)
    app.use("/storeMarkUpA/v1/auth", authRoutes)
    app.use("/storeMarkUpA/v1/auth/client", authRoutes)
    app.use("/storeMarkUpA/v1/user", userRoutes)
    app.use("/storeMarkUpA/v1/product", productRoutes)
    app.use("/storeMarkUpA/v1/shoppingCart", cartRoutes)
    app.use("/storeMarkUpA/v1/purchase", purchaseRoutes)
    app.use("/storeMarkUpA/v1/invoice", invoiceRoutes)
    app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs))
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}
