const express = require('express')

const router = express.Router()

router.use((req, res, next) => {
    next({
        message: 'Resource not found',
        status: 404,
    })
})

module.exports = router