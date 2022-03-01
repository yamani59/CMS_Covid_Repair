const Controller = require('./Controller')

const UserController = new Controller('User')
const NewsController = new Controller('News')
const CategoryController = new Controller('Category')
const SlideController = new Controller('Slide')

const control = {
  UserController,
  NewsController,
  CategoryController,
  SlideController
}