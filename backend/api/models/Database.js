require('dotenv').config({ path: '../.env'})

<<<<<<< HEAD:backend/api/models/Database.js
const mysql = require('mysql')
=======
const mysql = require('mysql2')
>>>>>>> b2ec764526e1d0c54dd5a0b06531f8adbdc7f7e2:backend/models/Database.js

class Database {
  #table
  #conn
<<<<<<< HEAD:backend/api/models/Database.js

=======
  
>>>>>>> b2ec764526e1d0c54dd5a0b06531f8adbdc7f7e2:backend/models/Database.js
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
<<<<<<< HEAD:backend/api/models/Database.js
    let query = (by !== null) ?
      this.#conn.format('SELECT * FROM ??', [this.#table]) :
      this.#conn.format('SELECT * FROM ?? WHERE ?? = ?', [this.#table, by.key, by.value])
    
    this.#conn.execute(query, (err, result) => {
      if (err) throw err
      callback(result)
    })
=======
    let query = (by === null) ?
      mysql.format('SELECT * FROM ??', [this.#table]) :
      mysql.format('SELECT * FROM ?? WHERE ?? = ?', [this.#table, by.key, by.value])

    this.#conn.execute(query, (err, result) => {
        if (err) throw err
        callback(result)
      })
>>>>>>> b2ec764526e1d0c54dd5a0b06531f8adbdc7f7e2:backend/models/Database.js
  }

  /**
   * 
   * @param {Object} data 
   * @param {Function} callback 
   */
  insertData(data, callback) {
    this.#conn.execute(
      `
      INSERT INTO ?? SET ?
      `, [this.#table, data],
      (err, result) => {
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
    this.#conn.execute(
      `
      UPDATE ?? SET ? WHERE ?? = ?
      `,[this.#table, data, compared.key, compared.value],
      (err, result) => {
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
    this.#conn.execute(
      `
      DELETE FROM ?? WHERE ?? = ?
      `, [this.#table, compared.key, compared.value],
      (err, result) => {
        if (err) throw err
        callback(result.changedRows)
      }
    )
  }
}

module.exports = Database