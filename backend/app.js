require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const morgan = require('morgan')

const app = express()
const PORT = process.env.PORT || 8080

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY],
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
}))

const routes = require('./routers')
app.use(routes)

app.listen(PORT, () => { console.log(`SERVER RUNNING IN PORT ${PORT}`)})