const Database = require('../models')

class Controller {
  constructor(model) {
    this.#model = model
  }

  model() {
    return new Database[this.#model]()
  }
}

module.exports = Controller