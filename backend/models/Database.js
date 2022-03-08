const path = require('path')
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const htmlspecialchar = require('htmlspecialchars')
require('dotenv').config({ path: path.join(__dirname, '../.env')})

class Database {
  #table
  #conn
  /**
   * for instance property table 
   * @param {String} table
   */
  constructor(table) {
    this.#table = table
    this.#conn = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: '',
      database: process.env.DB_NAME
    })
  }

  /**
   * 
   * @param {Object} by 
   * @param {function} callback 
   */
  getData(by = null, callback) {
    let query = (by === null) ?
      mysql.format('SELECT * FROM ??', [this.#table]) :
      mysql.format('SELECT * FROM ?? WHERE ?? = ?', [this.#table, by.key, by.value])

    this.#conn.execute( query , (err, result) => {
        if (err) throw err

        const urlImage = path.join(__dirname, '../dist/')
        if (result.length != 0 && result[0].image !== undefined) {
          result.map(index => {
            index.image = urlImage + index.image
          })
        } 

        callback(result)
      })
  }

  /**
   * 
   * @param {Object} data 
   * @param {Function} callback 
   */
  insertData(data, callback) {
    for (let key in data) {
      data[key] = htmlspecialchar(data[key])
    }

    if (data.password) 
      data.password = bcrypt.hashSync(data.password, 10)

    const query = mysql.format('INSERT INTO ?? SET ?', [this.#table, data])
    this.#conn.execute( query , (err, result) => {
        if (err) throw err
        callback(result.changedRows)
      }
    )
  }

  /**
   * 
   * @param {Object} data 
   * @param {Object} compared 
   * @param {Function} callback 
   */
  updateData(data, compared, callback) {
    for (let key in data) {
      data[key] = htmlspecialchar(data[key])
    }

    if (data.password) 
      data.password = bcrypt.hashSync(data.password, 10)

    const query = mysql.format('UPDATE ?? SET ? WHERE ?? = ?', 
                      [this.#table, data, compared.by, compared.value])
                      
    this.#conn.execute( query , (err, result) => {
        if (err) throw err
        callback(result.changedRows)
      }
    )
  }

  /**
   * 
   * @param {Object} compared 
   * @param {Function} callback 
   */
  deleteData(compared, callback) {
    const query = mysql.format('DELETE FROM ?? WHERE ??',
                      [this.#table, compared.by, compared.value])

    this.#conn.execute( query , (err, result) => {
        if (err) throw err
        callback(result.changedRows)
      }
    )
  }
}

module.exports = Database