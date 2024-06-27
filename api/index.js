const express = require('express')
const { config } = require('dotenv')
const mongoose = require('mongoose')
const router = require('./routes')

config()

const app = express()

const port = process.env.API_PORT
const dbUrl = process.env.MONGO_DB

app.use(express.json())
app.use(express.urlencoded())

app.use(router)

app.use((error, req, res, next) => {
    res.status(error.status || 400)
    
    res.send({
        message: error.message || 'Problem while fulfilling request',
    })
})

app.listen(5000, async () => {
    console.log(`Server started at http://localhost:${port}`)
    console.log('Press Ctrl+C to stop')

    await mongoose.connect(dbUrl)
    console.log('MongoDb connected')
})