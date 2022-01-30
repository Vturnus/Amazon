const multer = require('multer')
const multerStorage = multer.memoryStorage()
const sharp = require('sharp')

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb (null, true)
    } else {
        cb('Please upload image only', false)
    }
}

const upload = multer( {
    storage: multerStorage,
    fileFilter: multerFilter
})

exports.uploadProductImage = upload.single('image')
exports.uploadOwnerImage = upload.single('image')

exports.resizeProductImage = async (req, res, next) => {
    if(!req.file) return next()
    try {
        console.log('uploading...');
        req.body.image =`product-${req.body.title}-${Date.now()}-image.jpeg`
        await sharp(req.file.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({quality: 90})
            .toFile(`../public/img/products/${req.body.image}`)
        next()
    } catch (err) {
        console.log('Error ', err)
    }

}
exports.resizeOwnerImage = async (req, res, next) => {

    if(!req.file) return next()
    try {
        console.log('uploading...');
        req.body.image =`owner-${req.body.name}${Date.now()}-image.jpeg`
        await sharp(req.file.buffer)
            .resize(500, 500)
            .toFormat('jpeg')
            .jpeg({quality: 90})
            .toFile(`../public/img/owners/${req.body.image}`)
        next()
    } catch (err) {
        console.log('Error ', err)
    }

}