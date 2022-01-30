const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const userRoutes = require('./routes/userRoutes')
const ownersRoutes = require('./routes/ownersRoutes')

const app = express()

dotenv.config({
    path: './config.env'
})

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASS)

mongoose.connect(DB,
    (err) => {
        if (err) {
            console.log("Couldn't connect to database ", err)
        } else {
            console.log('Connected to database...')
        }
    }
    )

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// APIs
app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', ownersRoutes)
app.use('/api', userRoutes)


app.listen(3000, (err) => {
    if(err) {
        console.log(err)
    }
    else {
        console.log('Going live on 3000...')
    }
})