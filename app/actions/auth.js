const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');

const { SECRET_KEY } =require('../config');

const { createUser, getUserByEmail } = require('./User');

Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

const createToken = ({ firstName, lastName, email}) => {
  const expiredToken = new Date().addDays(1).getTime();

  const payload = {
    firstName,
    lastName,
    email,
    expiredToken
  }

  return jwt.encode( payload, SECRET_KEY);
}

const signup = (data) => {
  return new Promise( (resolve, reject) => {
    createUser(data)
      .then( (user) => {
        const token = createToken(user);
        resolve(token);
      })
      .catch( (error) =>  reject(error));
  })
}

const login = ({ email, password}) => {
  return new Promise( (resolve, reject) => {
    getUserByEmail(email)
      .then( (user) => {
        bcrypt.compare(
          password,
          user.password,
          (error, isValid) =>{
            if (error) {
              reject(error);
            }
            isValid
              ? resolve(createToken(user))
              : reject('Password does not match')
          })
      })
      .catch( (error) =>  reject(error));
  })

}

module.exports = {
  signup,
  login,
}

