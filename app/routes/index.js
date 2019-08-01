const express = require('express');
const { homeController } = require('../controller/home');
const {
  createMovie, getMovies, getMovieById,
  getMovieByName, updateMovie, deleteLogicMovie,
  deleteMovieForEver
} = require('../controller/movie');

const router = express.Router();

// Home router
router.get('/', homeController);

// Create Movie
router.post('/movie', createMovie);

//  All Movies
router.get('/movies', getMovies );

// One Movie
router.get('/movie/:id', getMovieById);

// Search by name
router.get('/search', getMovieByName);

// Update Movie
router.patch('/movie/:id', updateMovie);

// Delete Logic Movie
router.delete('/movie/:id', deleteLogicMovie);

// Delete Forever
router.delete('/movie/delete/:id', deleteMovieForEver);

module.exports = router;
