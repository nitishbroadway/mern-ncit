const express = require('express')
const { Front } = require('../controllers')

const router = express.Router()

router.get('/article/latest', Front.ArticlesCtrl.latest)

router.get('/article/:id', Front.ArticlesCtrl.byId)

router.post('/article/:id/comment', Front.ArticlesCtrl.comment)

router.get('/category', Front.CategoriesCtrl.list)

router.get('/category/:id', Front.CategoriesCtrl.byId)

router.get('/category/:id/articles', Front.ArticlesCtrl.byCatId)

router.get('/image/:filename', (req, res, next) => {
    const { filename } = req.params

    res.sendFile(`uploads/${filename}`, {
        root: "./"
    })
})

module.exports = router