
const express = require('express');
const router = express.Router();
const  {homeController} = require('../controller/home');
const  movieController  = require('../controller/movie');
const  userController  = require('../controller/user');
const  authController  = require('../controller/auth');
//  Home
router.get('/', homeController);
// Movi
router.post('/movie', movieController.createMovie);
router.get('/movies', movieController.getMovies);
router.get('/movie/:id', movieController.getMovie);
router.get('/search/', movieController.searchMovie);
router.patch('/movie/:id', movieController.updateMovie);
router.delete('/movie/:id', movieController.deleteMovie);
router.delete('/movie/delete/:id', movieController.removeMovie);
// User
router.post('/user', userController.createUser)
// Authenticate
router.post("/signup", authController.signUp);
router.post("/login", authController.login);


module.exports = router;
