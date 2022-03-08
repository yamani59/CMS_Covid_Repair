const Database = require('../models')
const formidable = require('formidable')
const path = require('path')
const mv = require('mv')
let pathSave = path.join(__dirname, '../dist/')
const form = formidable({ 
  multiples: true,
  // filter: (name, originalFilename, mimetype) => {
  //   return mimetype && mimetype.includes('image')
  // }
})

class Controller {
  constructor(model) {
    this.database = model
  }

  checkExtensi(arrayString, extensi) {
    const ext = arrayString.split('/')[1]
    if (!extensi.includes(ext)) return false
    return ext
  }

  model() {
    return new Database[this.database]()
  }

  postData(req, res) {
    try {
      form.parse(req, (err, fields, files) => {
        if (err) throw err
        
        if (files.image === undefined)
          res.status(422).json({ msg: 'connot be proceed' }).end()

        const ext = this.checkExtensi(files.image.mimetype, ['jpg', 'png', 'jpeg'])
        if (ext === false) throw new Error('failed file')
        
        const fileName = files.image.newFilename + '.' + ext
        const pathNow = files.image.filepath
        pathSave = pathSave + fileName

        mv(pathNow, pathSave, (err) => {
          if (err) throw err

          fields.image = fileName
          this.model().insertData(fields, (data) => {
            if (data == 0) throw new Error('cannot insert')
            res.status(200).json({ msg : 'new added successfully' }).end()
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
        if (files.image) {
          const ext = this.checkExtensi(files.image.mimetype, ['jpg', 'png', 'jpeg'])
          if (ext === false) throw new Error('failed file')
          
          const fileName = files.image.newFilename + '.' + ext
          const pathNow = files.image.filepath
          pathSave = pathSave + fileName

          mv(pathNow, pathSave, (err) => {
            if (err) throw err

            fields.image = fileName
            const compared = { id: 'id', value: fields.id }
            this.model().updateData(fields, compared, (change) => {
              if (change == 0) throw new Error('cannot updateData')
              res.status(200).json({ msg: 'updated successfully' }).end()
            })
          })
        }

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