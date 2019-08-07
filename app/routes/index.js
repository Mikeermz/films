
const express = require('express');
const router = express.Router();
const  {homeController} = require('../controller/home');
const  movieController  = require('../controller/movie');
router.get('/', homeController);
router.post('/movie', movieController.createMovie);
router.get('/movies', movieController.getMovies);
router.get('/movie/:id', movieController.getMovie);
router.get('/search/', movieController.searchMovie);
router.patch('/movie/:id', movieController.updateMovie);
router.delete('/movie/:id', movieController.deleteMovie);
router.delete('/movie/delete/:id', movieController.removeMovie);

module.exports = router;
