require('dotenv').config()

const mysql2 = require('mysql2')

class Database {

  /**
   * for instance property table 
   * @param {String} table
   */
  constructor(table) {
    this.#table = table
    this.#conn = mysql2.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    })
  }

  /**
   * 
   * @param {Object} by 
   * @param {function} callback 
   */
  getData(by = null, callback) {
    query = (by !== null) ?
      'SELECT * FROM ??' : 'SELECT * FROM ?? WHERE ?? = ?'

    if (by === null)  
      this.#conn.execute(query, [this.#table],
        (err, result) => {
          if (err) throw err
          callback(result)
        })
    else
      this.#conn.execute(query, [this.#table, by.key, by.value],
        (err, result) => {
          if (err) throw err
          callback(result)
        })
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
      `, [this.#table, data], (err, result) => {
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