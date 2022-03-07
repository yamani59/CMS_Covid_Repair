const Database = require('../models')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
let pathSave = path.join(__dirname, '../dist/')
const form = formidable({ 
  multiples: true,
  filter: (name, originalFilename, mimetype) => {
    return mimetype && mimetype.includes('image')
  }
})

class Controller {
  constructor(model) {
    this.database = model
  }

  model() {
    return new Database[this.database]()
  }

  postData(req, res) {
    try {
      form.parse(req, (err, fields, files) => {
        if (err) throw err
        console.log(files)
        console.log(fields)
        
        if (files.image === undefined)
          res.status(422).json({ msg: 'connot be proceed' }).end()
        
        const fileName = files.image.newFilename
        const pathNow = files.image.filepath + '.' + files.image.mimetype.split('/')[1]
        pathSave = pathSave + fileName

        fs.rename(pathNow, pathSave, (err) => {
          if (err) throw err

          fields.image = fileName
          this.model().insertData(fields, (data) => {
            if (data > 0) throw new Error('cannot insert')
            res.status(200).json('new added successfully').end()
          })
        })
        res.json(files)
      })
    } catch (err) {
      res.status(422).json({ msg: 'connot be proceed' }).end()
    }
  }

  putData(req, res) {
    try {
      form.parse(req, (err, fields, files) => {
        if (err) throw err
        if (files.image !== undefined) {
          const fileName = files.image.newFilename + '.' + files.image.mimetype.split('/')[1]
          const pathNow = files.image.filepath + '.' + files.image.mimetype.split('/')[1]
          pathSave = pathSave + fileName

          fs.rename(pathNow, pathSave, (err) => {
            if (err) throw err

            fields.image = fileName
            this.model().insertData(fields, (data) => {
              if (data > 0) throw new Error('cannot insert')
              res.status(200).json('new added successfully').end()
            })
          })
        }

      })
      this.model().updateData(res.body, (data) => {
        if (data === 0) throw new Error('cannot be proceed')
        res.status(200).json({ msg: `${this.database} updated successfully` })
      })
    } catch (err) {
      res.status(422).json({ msg: 'connot be proceed' })
    }
  }

  getData(req, res) {
    this.model = this.model.bind(this)
    try {
      console.log(this)
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
        res.status(200).json({ msg: `${this.database} deleted successfully` })
      })
    } catch (err) {
      res.status(422).json({ msg: 'connot be proceed' })
    }
  }
}

module.exports = Controller