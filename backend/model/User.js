const connection = require('./config')
const sanitzeHtml = require('sanitize-html')

const table = 'user'
const failed = 'cannot be proceed'

module.exports = {
  //Insert User (Post)
  insertUser: (data) => {
    const formData = {}
    for (const key in data) {
      formData[key] = sanitzeHtml(req.body[key])
    }
    return new Promise((resolve, reject) => {
      connection.query(
        `
        INSERT INTO ?? SET ?
        `, [table, formData], function (err, rows) {
          if (err) reject(err)
          resolve(rows)
      })
    })
  },

  //get User
  getUser: () => {
    return new Promis((resolve, reject) => {
      connection.query(
        `
        SELECT * FROM ??
        `, [table], function(err, rows) {
          if (err) reject({ msg: failed })
          resolve(rows)
        }
      )
    })
  },

  //get User by Id
  getUserById: (param) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        SELECT * FROM ?? WHERE ?? = ?
        `, [table, 'id', param], function(err, rows) {
          if (err) reject(err)
          resolve(rows)
        }
      )
    })
  },

  //update User
  updateUser: (data) => {
    const param = data.id
    const formData = {}
    for (const key in data) {
      formData[key] = sanitzeHtml(data[key])
    }
    return new Promise((resolve, reject) => {
      connection.query(
        `
        UPDATE ?? SET ? WHERE ?? = ?
        `, [table, formData, 'id', param], function (err, rows) {
          if (err) reject(err);
          resolve(rows)
        }
      )
    })
  },

  //delete User
  deleteUser: (param) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        DELETE FROM ?? WHERE ?? = ?
        `, [table, 'id', param], function (err, rows) {
          if (err) reject(err);
          resolve(rows)
        }
      )
    })
  }
}