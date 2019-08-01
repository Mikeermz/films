const express = require('express');
const { Movie } = require('../model/Movie');
const { homeController } = require('../controller/home');
const { createMovie } = require('../controller/movie');
const router = express.Router();

// Home router
router.get('/', homeController);

// Create Movie
router.post('/movie', createMovie);

//  All Movies
router.get('/movies', (req, resp) => {
  Movie.find({isActive: true}).exec()
      .then( ( movies ) => resp.status(200).send({movies}))
      .catch(( error ) => resp.status(409).send(error))
});

// One Movie
router.get('/movie/:id', (req, resp) => {
  const { id } = req.params;
  Movie.findById(id).exec()
      .then( ( movie ) => movie
                          ? resp.status(200).send({movie})
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
});

// One Movie
router.get('/search', (req, resp) => {
  const { title } = req.query
  Movie.findOne({title}).exec()
      .then( ( movie ) => movie
                          ? resp.status(200).send({movie})
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
});

// Update Movie
router.patch('/movie/:id', (req, resp) => {
  console.log(req.body);
  const { id } = req.params;
  Movie.findByIdAndUpdate(id, {$set: req.body}, {new: true}).exec()
      .then( ( movie ) => movie
                          ? resp.status(200).send({movie})
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
});

// Delete Logic Movie
router.delete('/movie/:id', (req, resp) => {
  const { id } = req.params;
  Movie.findByIdAndUpdate(id, {$set: {isActive: false}}, {new: true}).exec()
      .then( ( movie ) => movie
                          ? resp.status(200).send({movie})
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
});

// Delete Forever
router.delete('/movie/delete/:id', (req, resp) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id).exec()
      .then( ( movie ) => movie
                          ? resp.status(200).send({movie})
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
});

module.exports = router;
