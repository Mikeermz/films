const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firtsName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'movies'
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  },
}, {timestamps: true});

UserSchema.pre('save', (next) => {
  let user = this;
  if (!user.isModified('password')){
    return next();
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    return next();
  })
})

module.exports = mongoose.model("User", UserSchema);
