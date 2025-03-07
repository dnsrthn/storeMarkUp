import Cart from "./cart.model.js"
import Product from "../product/product.model.js"

export const addToCart = async (req, res) => {
    try{
        const { nameProduct, quantity } = req.body;

        const product = await Product.findOne({ nameProduct: nameProduct })
        if(!product){
            return res.status(400).json({
                success: false, message: "Product not found"
            })
        }
        if(product.stock === 0){
            return res.status(400).json({
                success: false,   message: "Product out of stock"
            })
        }
        if(quantity > product.stock){
            return res.status(400).json({
                success: false, message: `Remaining Stock: ${product.nameProduct}`
            })
        }
        let cart = await Cart.findOne({ user: req.usuario._id });
        if(!cart){
            cart = new Cart({ user: req.usuario._id, products: [] });
        }

        const productExist = cart.products.find(p => p.product.toString() === product._id.toString());
        if(productExist){
            productExist.quantity += quantity; 
        }else{
            cart.products.push({ product: product._id, quantity });
        }

        const shoppingCart = await cart.save();
        return res.status(200).json({
            success: true,  message: "Product added to cart",  shoppingCart
        })
    }catch(error){
        return res.status(500).json({
            success: false, message: "Error adding product to cart", error: error.message
        })
    }
}

export const getCart = async (req, res) => {
    try{
        const shoppingCart = await Cart.findOne({ user: req.usuario._id }).populate("products.product", "nameProduct price -_id")
        if(!shoppingCart){
            return res.status(400).json({
                success: false,  message: "Cart not found"
            })
        }
        return res.status(200).json({
            success: true,  message: " Shopping Cart:",   shoppingCart
        }) 
    }catch(error){
        return res.status(500).json({
            success: false,  message: "Error getting cart",  error: error.message
        })
    }
}

export const deleteFromCart = async (req, res) => {
    try{
        const { nameProduct } = req.body

        const shoppingCart = await Cart.findOne({ user: req.usuario._id }).populate("products.product")
        shoppingCart.products = shoppingCart.products.filter(p => p.product.nameProduct !== nameProduct)
       
        const deleteFromCart = await shoppingCart.save()

        return res.status(200).json({
            success: true, message: "Product removed from cart",  deleteFromCart
        })
    }catch(error){
        return res.status(500).json({
            success: false,  message: "An error ocurred while removing product from the cart",  error: error.message
        })
    }    
}   