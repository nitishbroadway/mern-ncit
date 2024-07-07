const express = require('express')
const { Front } = require('../controllers')

const router = express.Router()

router.get('/article/latest', Front.ArticlesCtrl.latest)

router.get('/article/:id', Front.ArticlesCtrl.byId)

router.post('/article/:id/comment', Front.ArticlesCtrl.comment)

router.get('/category', Front.CategoriesCtrl.list)

router.get('/category/:id', Front.CategoriesCtrl.byId)

router.get('/category/:id/articles', Front.ArticlesCtrl.byCatId)

module.exports = router