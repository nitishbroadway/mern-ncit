const express = require('express')
const authRoutes = require('./auth.routes.js')
const profileRoutes = require('./profile.routes.js')
const authorsRoutes = require('./authors.routes.js')
const categoriesRoutes = require('./categories.routes.js')
const articlesRoutes = require('./articles.routes.js')
const { auth, adminOnly } = require('../lib/index.js')

const router = express.Router()

router.use('/auth', authRoutes)

router.use('/profile', auth, profileRoutes)

router.use('/authors', auth, adminOnly, authorsRoutes)

router.use('/categories', auth, categoriesRoutes)

router.use('/articles', auth, articlesRoutes)

router.use((req, res, next) => {
    next({
        message: 'Resource not found',
        status: 404,
    })
})

module.exports = router