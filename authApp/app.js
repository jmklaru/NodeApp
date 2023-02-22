const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
const router = require('./Routes/Auth.route')
require('dotenv').config()
const AuthRoute = require('./Routes/Auth.route')

const app = express()


app.get('/', async(req,res, next) => {
    res.send('Hello from express.')
})

app.use('/auth', AuthRoute)


app.use(async(req, res, next) => {
    //const error = new Error('Not found')
    //error.status = 404
    //next(error)
    next(createError.NotFound('This route does not exist'))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`)
})