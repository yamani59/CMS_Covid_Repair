require('dotenv').config()

const mysql = require('mysql')

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
    let query = (by !== null) ?
      this.#conn.format('SELECT * FROM ??', [this.#table]) :
      this.#conn.format('SELECT * FROM ?? WHERE ?? = ?', [this.#table, by.key, by.value])
    
    this.#conn.execute(query, (err, result) => {
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