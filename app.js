const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const { Movie } = require('./Movie');
const PORT = process.env.PORT;

// Call express

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, resp) => {
  const suma = 2 + 3
  const { headers } = req; 
  const { host } = headers
  if (host === 'localhost:3002') {
    resp.send({
      message: `Server on ${host}`, 
    });
  } else {
    resp.send({suma})
  }
});

// Create Movie 
app.post('/movie', (req, resp) => {
  // const { title, genre } = req.body
  
  const newMovie = Movie(req.body );

  newMovie.save((error, movie) => {
    error ? resp.status(409).send(error) : resp.status(201).send(movie)
  })
})

//  All Movies
app.get('/movies', (req, resp) => {
  Movie.find({isActive: true}).exec()
      .then( ( movies ) => resp.status(200).send({movies}))
      .catch(( error ) => resp.status(409).send(error))
});

// One Movie
app.get('/movie/:id', (req, resp) => {
  const { id } = req.params;
  Movie.findById(id).exec()
      .then( ( movie ) => movie 
                          ? resp.status(200).send({movie}) 
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
});

// One Movie
app.get('/search', (req, resp) => {
  const { title } = req.query
  Movie.findOne({title}).exec()
      .then( ( movie ) => movie 
                          ? resp.status(200).send({movie}) 
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
});

// Update Movie
app.patch('/movie/:id', (req, resp) => {
  console.log(req.body);
  const { id } = req.params;
  Movie.findByIdAndUpdate(id, {$set: req.body}, {new: true}).exec()
      .then( ( movie ) => movie 
                          ? resp.status(200).send({movie}) 
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
});

// Delete Logic Movie
app.delete('/movie/:id', (req, resp) => {
  const { id } = req.params;
  Movie.findByIdAndUpdate(id, {$set: {isActive: false}}, {new: true}).exec()
      .then( ( movie ) => movie 
                          ? resp.status(200).send({movie}) 
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
});

// Delete Forever
app.delete('/movie/delete/:id', (req, resp) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id).exec()
      .then( ( movie ) => movie 
                          ? resp.status(200).send({movie}) 
                          : resp.status(404).send({message: 'Not Found'}) )
      .catch(( error ) => resp.status(409).send(error))
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

