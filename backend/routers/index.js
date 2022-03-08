const route = require('express').Router()
const { UserController,
        NewsController,
        SlideContoller,
        CategoryController } = require('../controllers')

// User Router
route.get('/v1/admin', (req, res) => {
  UserController.getData(req, res)
})
route.post('/v1/admin/new', (req, res) => {
  UserController.postData(req, res)
})
route.put('/v1/admin/:id', (req, res) => {
  UserController.putData(req, res)
})
route.delete('/v1/admin/:id', (req, res) => {
  UserController.deleteData(req, res)
})

// News Router
route.get('/v1/news', (req, res) => {
  NewsController.getData(req, res)
})
route.post('/v1/news/new', (req, res) => {
  NewsController.postData(req, res)
})
route.put('/v1/news/:id', (req, res) => {
  NewsController.putData(req, res)
})
route.delete('/v1/news/:id', (req, res) => {
  NewsController.deleteData(req, res)
})

// Category Router
route.get('/v1/category', (req, res) => {
  CategoryController.getData(req, res)
})
route.post('/v1/category/new', (req, res) => {
  CategoryController.postData(req, res)
})
route.put('/v1/category/:id', (req, res) => {
  CategoryController.putData(req, res)
})
route.delete('/v1/category/:id', (req, res) => {
  CategoryController.deleteData(req, res)
})

// Slide Router
route.get('/v1/slide', (req, res) => {
  SlideContoller.getData(req, res)
})
route.post('/v1/slide/new', (req, res) => {
  SlideContoller.postData(req, res)
})
route.put('/v1/slide/:id', (req, res) => {
  SlideContoller.putData(req, res)
})
route.delete('/v1/slide/:id', (req, res) => {
  SlideContoller.deleteData(req, res)
})

module.exports = route