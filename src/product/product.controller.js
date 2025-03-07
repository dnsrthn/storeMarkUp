import Product from "./product.model.js"
import Category from "../category/category.model.js"

export const addProduct = async (req, res) => {
    try{
        const data = req.body
        const category = await Category.findOne({ nameCategory: data.category })
        let productImage = req.file ? req.file.filename : null
        data.productImage = productImage

        if(!category){
            return res.status(404).json({
                success: false, message: 'Category not found',
            })
        }
        const product = new Product({
            ...data,
            category: category._id,
        })
        await product.save()
        res.status(200).json({
            success: true, product
        })
    }catch(error){
        res.status(500).json({
            success: false, message: 'An error ocurred whilet saving thre product', error: error.message
        })
    }
}

export const getByName = async (req, res) => {
    try{
        const { nameProduct } = req.params
        const product = await Product.findOne({ nameProduct: nameProduct }).populate("category", "nameCategory -_id")

        if(!product){
            return res.status(404).json({
                sucess:false, message: "Product not found"
            })
        }
        return res.status(200).json({
            success: true, product
        })

    }catch(err){
        return res.status(500).json({
            success: false, message: 'An error ocurred while looking up the product', error: err.message
        })
    }
}

export const getProduct = async (req, res) =>{
    try{
        const products = await Product.find().populate("category", "nameCategory")

        return res.status(200).json({
            success: true, message: "Cataloague", total: products.length, products
        })
    }catch(error){
        return res.status(500).json({
            success: false, message: 'An error ocurred while looking up the prouct', error: error.menssge
        })
    }
}

export const getProductByCategory = async (req, res) => {
    try{
        const { uid } = req.params
        const category = await Category.findById(uid)

        if(!category) {
            return res.status(400).json({
                success: false, message: "Product with this category not found"
            })
        }
        const products = await Product.find({category: uid})
        res.status(200).json({
            success: true, total: products.length, products
        })

    }catch(error){
        return res.status(500).json({
            success: false, message: 'An error ocurred while getting products while category', error: error.messge
        })
    }
}

export const getSoldOutProducts = async (req, res) => {
    try{

        const products = await Product.find({stock: 0})
        res.status(200).json({
            success: true, total: products.length, products
        })   
    }catch(error){
        return res.status(500).json({
            success: false, message: 'Error when displaying the product catalog.', error: error.menssge
        })
    }
}

export const updateProduct = async (req, res) => {
    try{
        const { uid } = req.params
        const { ...data} = req.body
        const product = await Product.findByIdAndUpdate(uid, data, {new: true})
        
        res.status(200).json({
            success: true, message: 'Product has been updated successfully.', product
        })

    }catch(error){
        return res.status(500).json({
            success: false, message: 'An error ocurred while updating product', error: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const { uid } = req.params
        const product = await Product.findByIdAndDelete(uid)
        
        if(!product){
            return res.status(404).json({
                success: false, message: 'Product not found'
            })
        }

        return res.status(200).json({
            success: true, message: 'Product ha sbeen deleted  successfully.', product
        })
    }catch(error){
        return res.status(500).json({
            success: false, message: 'An error ocurred while deleting product', error: error.message
        })
    }
}

export const getBestSellers = async (req, res) => {
    try{
        const bestSellers = await Product.find().sort({sales: -1}).limit(10)
        return res.status(200).json({
            success: true, message: 'Our Best Sellers:', total: bestSellers.length, bestSellers
        })

    }catch(error){
        return res.status(500).json({
            success: false, message: 'An error ocurred while loading our best sellers', error: error.message
        })
    }
}