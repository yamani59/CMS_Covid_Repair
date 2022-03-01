const route = require('express').Router()
const { UserController } = require('../controllers')

// User Router
route.get('/v1/admin', [UserController.getData])

module.exports = route