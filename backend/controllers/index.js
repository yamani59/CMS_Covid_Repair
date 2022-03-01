const Controller = require('./Controller')

module.exports = {
  UserController: new Controller('User'),
  NewsController: new Controller('News'),
  CategoryController: new Controller('Category'),
  Slide: new Controller('Slide')
}