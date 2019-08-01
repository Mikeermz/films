const { Movie } = require('../model/Movie');

const createMovie = (req, resp) => {
  const newMovie = Movie(req.body );

  newMovie.save((error, movie) => {
    error ? resp.status(409).send(error) : resp.status(201).send(movie)
  })
}

module.exports = {
  createMovie
};
