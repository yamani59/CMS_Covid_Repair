const Controller = require('./Controller')

let UserController = new Controller('User')
const NewsController = new Controller('News')
const CategoryController = new Controller('Category')
const SlideContoller = new Controller('Slide')

module.exports = {
  UserController,
  NewsController,
  CategoryController,
  SlideContoller
}