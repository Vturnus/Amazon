const router = require('express').Router()
const Category = require('../models/category')

router.post('/categories', async(req, res) => {
    try {
        const category = new Category()
        category.type = req.body.type

        await category.save()

        res.status(201).json({
            success: true,
            message: 'New category saved have been saved'
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Category could not be created' + e.message
        })
    }
} )

router.get('/categories', async (req, res) => {
    try {
        let categories = await Category.find()
        res.status(200).json({
            success: true,
            categories
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Category could not be created' + e.message
        })
    }
})

module.exports = router