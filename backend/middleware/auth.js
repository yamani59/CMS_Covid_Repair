requiere('dotenv').config({
  path: '../'
})

const jwt = require('jsonwebtoken')

module.exports = {
  //validasi form (login, registrasi)
  validasi: (req, res, next) => {
    const {
      username,
      email = null,
      password,
      role = null,
      nomor_phone = null
    } = req.body

    if (email && role && nomor_phone) {
      if (username && password) next()
      res.status(401).json({ msg: 'form cannot be empty' }).end()
    }

    if (username && password) next()
    res.status(401).json({ msg: 'form cannot be empty' }).end()
  },

  authorizationCheck: (req, res, next) => {
    const tokenBearer = req.headers.authorization
    if (token) {
      const token = tokenBearer.split(' ')[0]
      jwt.verify(token, process.env.secret, function(err, decoded) {
        if (err) res.status(401).json({ msg: 'invalid' }).end()
        req.auth = decoded
        next()
      })
    }
    res.status(401).json({ msg: 'invalid' }).end()
  }


}