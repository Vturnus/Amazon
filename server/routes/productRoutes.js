const router = require('express').Router()
const Product = require('../models/product')
const photoUploader =  require('../middlewares/photoUploader')
// Create Product

router.route('/products')
    .post(photoUploader.uploadProductImage, photoUploader.resizeProductImage, async (req, res) => {
        try {
            let product = new Product()
            product.title = req.body.title
            product.description = req.body.description
            product.image = req.body.image
            product.price = req.body.price
            product.stockQuantity = req.body.stockQuantity
            await product.save()
            res.status(201).json({
                status: true,
                message: 'Product successfully created'
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Error...' + err.message
            })
        }
    })
    .get( async (req,res) => {
        try {
            let products = await Product.find()
            res.status(200).json({
                status: true,
                products
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Error...' + err.message
            })
        }
    })

router.route('/products/:id')
    .get(async (req, res) => {
        try {
            let product = await Product.findOne({_id: req.params.id})
            res.status(200).json({
                status: true,
                product
            })
        }  catch (err) {
            res.status(500).json({
                success: false,
                message: 'Error...' + err.message
            })
        }
    })
    .put(photoUploader.uploadProductImage, photoUploader.resizeProductImage, async (req, res) => {
        try {
            console.log('updating...')
            const updatedProduct = await Product.findOneAndUpdate({_id: req.params.id}, {
                $set: {
                    title: req.body.title,
                    price: req.body.price,
                    description: req.body.description,
                    category: req.body.category,
                    image: req.body.image,
                    owner: req.body.owner,
                    stockQuantity: req.body.stockQuantity
                }
            }, {upsert: true})

            res.status(200).json({
                status: true,
                message: 'Product updated Successfully',
                product: updatedProduct
            })

        }  catch (err) {
            res.status(500).json({
                success: false,
                message: 'Error...' + err.message
            })
        }
    })
    .delete(async (req, res) => {
        try {
            let deletedProduct = await Product.findOneAndDelete({_id: req.params.id})
            if (deletedProduct) {
                res.status(204).json({
                    status: 'success',
                    message: 'Product deleted successfully',
                })
            }
        } catch (e) {
            res.status(500).json({
                success: false,
                message: 'Error...' + e.message
            })
        }
    })

module.exports = router