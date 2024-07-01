const express = require('express')
const { Auth } = require('../controllers')

const router = express.Router()

router.get('/details', Auth.ProfileCtrl.details)

router.route('/password')
    .put(Auth.ProfileCtrl.password)
    .patch(Auth.ProfileCtrl.password)

router.route('/')
    .put(Auth.ProfileCtrl.update)
    .patch(Auth.ProfileCtrl.update)

module.exports = router