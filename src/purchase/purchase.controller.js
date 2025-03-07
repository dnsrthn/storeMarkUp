import Invoice from '../invoice/invoice.model.js'
import Product from '../product/product.model.js'
import Cart from '../cart/cart.model.js'
import PDFDocument from 'pdfkit'
import fs from 'fs'

export const purchase = async (req, res) => {
    try{
        const cart = await Cart.findOne({ user: req.usuario._id }).populate("products.product")
        if(!cart || cart.products.length === 0){
            return res.status(400).json({
                success: false,  message: "Items in cart were not found"
            })
        }

        let total = 0;
        const productsBuy = [];

        for(const item of cart.products){
            const product = item.product;
            if(product.stock < item.quantity){
                return res.status(400).json({
                    success: false,
                    message: `There are few units available for the product ${product.nameProduct}`
                })
            }
            product.stock -= item.quantity
            product.sales += item.quantity
            await product.save()

            const productTotal = product.price * item.quantity
            total += productTotal
            productsBuy.push({
                product: product._id,
                nameProduct: product.nameProduct,
                quantity: item.quantity,
                price: product.price,
                totalProduct: productTotal
            });
        }

        const invoice = new Invoice({
            user: req.usuario._id,
            products: productsBuy,
            total,
            date: new Date()
        });

        await invoice.save()

        cart.products = []
        await cart.save()

        const doc = new PDFDocument();
        const filePath = `./public/uploads/invoice-doc/invoice-${req.usuario._id}_${Date.now()}.pdf`
        doc.pipe(fs.createWriteStream(filePath))
        doc.fontSize(16).text('Invoice', { align: 'center' })
        doc.moveDown(1);
        doc.fontSize(12).text(`Date: ${new Date().toLocaleString()}`, { align: 'right' })
        doc.moveDown(1);
        doc.text('----------------------------------')
        doc.text('----invoice----')
         doc.text('----------------------------------')
        doc.text(`User: ${req.usuario.name}`);
        doc.text('----------------------------------')
        doc.moveDown(1)

        productsBuy.forEach(product => {
            doc.text(`Product: ${product.productName}`)
            doc.text(`Quantity: ${product.quantity}`)
            doc.text(`Price: Q.${product.price}.00`)
            doc.text(`Total: Q.${product.totalProduct}.00`)
            doc.text('----------------------------------')
        });
        doc.text(`Total: Q.${total}.00`)
        doc.text('----------------------------------')
        doc.end();

        return res.status(200).json({
            success: true,
            message: "Purchase completed",
            invoice
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "aN ERROR OCURRED WHILE completing purchase",
            error: error.message
        })
    }
}

export const history = async (req, res) => {
    try{
        const invoices = await Invoice.find({ user: req.usuario._id }).populate("products.product", "productName price")
        
        if(invoices.length === 0){
            return res.status(400).json({
                success: false,
                message: "No purchases found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Purchases",
            total: invoices.length,
            invoices
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error getting purchases",
            error: error.message
        })
    }
}