const { Movie } = require('../model/Movie');

const newMovie = async(data) => {
  return Movie.create(data);
}

module.exports = {
  newMovie
}
