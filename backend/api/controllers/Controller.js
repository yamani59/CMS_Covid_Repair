const Database = require('../models')

class Controller {
  #model

  constructor(model) {
    this.#model = model
  }

  model() {
    return new Database[this.#model]()
  }

  getData(by = null, callback) {
    this.#model().getData(by, callback)
  }

  insertData(data, callback) {
    this.#model().insertData(data, callback)
  }

  updateData(data, compared, callback) {
    this.#model().updateData(data, compared, callback)
  }

  deleteData(compared, callback) {
    this.#model().deleteData(compared, callback)
  }
}

module.exports = Controller