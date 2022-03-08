const Database = require('./Database')

class User extends Database {
  constructor() {
    super('user')
  }
}

class News extends Database {
  constructor() {
    super('news')
  }
}

class Category extends Database {
  constructor() { 
    super('category')
  }
}

class AccessToken extends Database {
  constructor() {
    super('access_token')
  }
}

class Slide extends Database {
  constructor() {
    super('slide')
  }
}

module.exports = {
  User: User,
  News: News,
  Category: Category,
  AccessToken: AccessToken,
  Slide: Slide,
}