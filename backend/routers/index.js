const route = require('express').Router()
const { UserController } = require('../controllers')

// User Router
route.get('/v1/admin', (req, res) => {
  UserController.getData(req, res)
})
route.post('/v1/admin/new', (req, res) => {
  UserController.postData(req, res)
})



module.exports = route