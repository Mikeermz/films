const mongoose = require('mongoose' );
const URL_MONGO = process.env.URL_MONGO;

mongoose.connect(URL_MONGO, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true },(err)=>{
  if (!err) {
    console.log('Conexión exitosa');
  } 
});

const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    title:{
      type: String,
      required: true,
      unique: true,
    },
    year: Number,
    duration: {
      type: Number,
      default: 90
    },
    genre: {
      type: String,
      enum: ['CO', 'DA', 'TE'],
      required: true
    },
    covers_url: [String],
    directors: {
      type: [{
        name: String,
        age: {
          type: Number,
          default: 18
        },
        nationality: {
          type: String,
          enum: ['MX', 'US'],
          required: true
        }
      }]
    },
    isActive: {
      type: Boolean,
      default: true
    },
  }, 
  {timestamps: true}
);

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = { Movie };