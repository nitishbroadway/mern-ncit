const express = require('express')
const { Cms } = require('../controllers')

const router = express.Router()

router.get('/', Cms.CommentsCtrl.index)

router.delete('/:id', Cms.CommentsCtrl.destroy)

module.exports = router