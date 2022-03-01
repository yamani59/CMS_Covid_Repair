require('dotenv')
const jwt = require('jsonwebtoken')
const express = require('express').Router()
express.get('/', function (req, res) {
  req.
})

const createToken = (username) => {
  return jwt.sign(username, process.env.SECRET_TOKEN)
}

const authenticate = (req, res) => {
  const username = req.body.username
  const token = createToken(username)

  
}