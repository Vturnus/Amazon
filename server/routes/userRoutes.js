const router = require('express').Router()
const User = require('../models/user')

router.post('/', (req, res) => {
    let user = new User()
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password

    user.save( (err => {
        if (err) {
            res.status(500).json( {
                status: 'failed',
                message: 'Error occurred' + err
            })
        } else {
            res.status(201).json( 'User successfully saved.')
        }
    }))
})

module.exports = router