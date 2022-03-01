const Database = require('../models')
export default class Controller {
  #model

  constructor(model) {
    this.#model = model
  }

  model() {
    return new Database[this.#model]()
  }

  postData(req, res) {
    try {
      this.model().insertData(res.body, (data) => {
        if (data === 0) throw new Error('cannot be proceed')
        res.status(200).json({ msg: `${this.#model} added successfully` })
      })
    } catch (err) {
      res.status(422).json({ msg: 'connot be proceed' })
    }
  }

  putData(req, res) {
    try {
      this.model().updateData(res.body, (data) => {
        if (data === 0) throw new Error('cannot be proceed')
        res.status(200).json({ msg: `${this.#model} updated successfully` })
      })
    } catch (err) {
      res.status(422).json({ msg: 'connot be proceed' })
    }
  }

  getData(req, res) {
    try {
      this.model().getData(null, (data) => {
        res.status(200).json(data).end()
      })
    } catch (err) {
      console.log(err)
      res.status(422).json({ msg: 'connot be proceed' }).end()
    }
  }

  deleteData(req, res) {
    const compared = { key: 'id', value: req.params.id }
    try {
      this.model().deletedata(compared, (data) => {
        if (data === 0) res.status(422).json({ msg: 'connot be proceed' })
        res.status(200).json({ msg: `${this.#model} deleted successfully` })
      })
    } catch (err) {
      res.status(422).json({ msg: 'connot be proceed' })
    }
  }
}
