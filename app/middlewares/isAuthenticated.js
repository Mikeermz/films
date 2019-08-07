const User = require('../model/User');
const jwt = require('jwt-simple');
const SECRET_KEY = '799651B27B2E5D99D17C9CF6754B5'

const tokenPrefix = 'JWT';

const verifyToken = ( token ) => {
  if (!token) {
    throw new Error('No token provided');
  }
  const [prefx, recivedToken] = token.split(' ');
  if (!recivedToken) {
    throw new Error('No token provided');
  }
  if ( prefx != tokenPrefix) {
    throw new Error('Invalid header format')
  }

  const payload = jwt.verify(recivedToken, SECRET_KEY);
  console.log(payload);
  return User.findById(payload._id);
}

module.exports = async( req, res, next) => {
  try {
    const { authorization } = req.headers;

    const user = await verifyToken(authorization);
    if ( !user ){
      return res.status(400).send({ message: 'Token is invalid'});
    }

    req.user = user;

    next();
  } catch (error) {
    const message = error.message;
    return res.status(400).send({ message });
  }
}
