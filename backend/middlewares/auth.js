require('dotenv')
const jwt = require('jsonwebtoken')
const { User, AccessToken } = require('../models')
const UserModel = new User()
const bcrypt = require('bcrypt')
const AccessTokenModel = new AccessToken()

const express = require('express').Router()
express.get('/', function (req, res, next) {
  
})

module.exports = {
  createToken: (username) => {
    return jwt.sign(username, process.env.SECRET_TOKEN, { expiresIn: '1h' })
  },
  
  dekripsi: async (data, encrypt) => { 
    return await bcrypt.compare(data, encrypt)
  },

  authenticate: (req, res, next) => {
    try {
      const { username, password } = req.body
      const compared = { key: 'username', value: username }
  
      UserModel.getData(compared, (data) => {
        if ( !this.dekripsi(data[0].password, password) && data[0].username !== username )
          throw new Error('Authentication failed')

        const token = this.createToken(username)
        const dataSend = {
          user_id: data[0].id,
          acces_token: token
        }

        AccessTokenModel.insertData(dataSend, (data) => {
          if (data === 0) throw new Error('Invalid')
          res.locals.myToken = dataSend
          next()
        })
      })
    } catch(err) {
      res.status(401).json({ msg: 'invalid authentication' }).end()
    }
  },

  authorization: (req, res, next) => {
    if (res.locals.myToken) {
      const myToken = res.locals.myToken
      jwt.verify(myToken, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) res.status(401).json({ msg: 'invalid authorization' }).end()
        res.locals.decoded = decoded
        next()
      })
    }

    let takeToken = req.headers.authorization
    takeToken = takeToken && takeToken.split(' ')[1]

    jwt.verify(takeToken, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) res.status(401).json({ msg: 'invalid authorization' }).end()
      res.locals.decoded = decoded
      next()
    })
  }
}
 