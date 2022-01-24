const app = require('express').Router()
const controller = requ

app.route('/v1/auth/login')
  .post(controller.login)

app.route('/v1/auth/')
module.exports = app