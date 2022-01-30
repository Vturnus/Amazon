const router = require('express').Router()
const Owners = require('../models/owner')
const photoUploader =  require('../middlewares/photoUploader')
const {model} = require("mongoose");

router.post('/owner', photoUploader.uploadOwnerImage, photoUploader.resizeOwnerImage, async (req, res) => {
    try {
        const owner = new Owners()
        owner.name = req.body.name
        owner.about = req.body.about
        owner.image = req.body.image

        await owner.save()
        res.status(201).json({
            success: true,
            message: 'Created successfully'
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Error...' + err.message
        })
    }

})

router.get('/owner', async (req,res) => {
    try {
        let owners = await Owners.find()
        res.status(200).json({
            success: true,
            owners
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Error...' + err.message
        })
    }

})
module.exports = router