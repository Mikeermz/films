const {
  Movie
} = require('../model/Movie');

const createMovie = async (data) => {
  return Movie.create(data);
}
const updateMovie = async (id, data) => {
  return Movie.findByIdAndUpdate(id, {
      $set: data
  }, {
      new: true
  }).exec();
}
const deleteMovie = async (id, data) => {
  return Movie.findByIdAndUpdate(id, {
      $set: {
          isActive: false
      }
  }, {
      new: true
  }).exec();
}
const removeMovie = async (id) => {
  return Movie.findByIdAndDelete(id).exec();
}

const searchMovie = async(data) =>{
  return Movie.find(data).exec();
}
const getMovie = async(id)=>{
  return Movie.findById(id).exec();
}
const getMovies= async()=>{
  return Movie.find({isActive:true}).exec();
}

module.exports = {
  getMovie,
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  removeMovie,
  searchMovie
}
