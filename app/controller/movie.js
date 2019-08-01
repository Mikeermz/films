const { Movie } = require('../model/Movie');

const createMovie = (req, resp) => {
  const newMovie = Movie(req.body );

  newMovie.save((error, movie) => {
    error ? resp.status(409).send(error) : resp.status(201).send(movie)
  })
};

const getMovies = (req, resp) => {
  Movie.find({isActive: true}).exec()
      .then( ( movies ) => resp.status(200).send({movies}))
      .catch(( error ) => resp.status(409).send(error))
};

// One Movie
const getMovieById = (req, resp) => {
  const { id } = req.params;
  Movie.findById(id).exec()
      .then( ( movie ) => movie
                          ? resp.status(200).send({movie})
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
};

// One Movie
const getMovieByName = (req, resp) => {
  const { title } = req.query
  Movie.findOne({title}).exec()
      .then( ( movie ) => movie
                          ? resp.status(200).send({movie})
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
};

// Update Movie
const updateMovie = (req, resp) => {
  console.log(req.body);
  const { id } = req.params;
  Movie.findByIdAndUpdate(id, {$set: req.body}, {new: true}).exec()
      .then( ( movie ) => movie
                          ? resp.status(200).send({movie})
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
};

// Delete Logic Movie
const deleteLogicMovie = (req, resp) => {
  const { id } = req.params;
  Movie.findByIdAndUpdate(id, {$set: {isActive: false}}, {new: true}).exec()
      .then( ( movie ) => movie
                          ? resp.status(200).send({movie})
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
};

// Delete Forever
const deleteMovieForEver = (req, resp) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id).exec()
      .then( ( movie ) => movie
                          ? resp.status(200).send({movie})
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
};

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  getMovieByName,
  updateMovie,
  deleteLogicMovie,
  deleteMovieForEver
};
