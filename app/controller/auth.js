const { Auth } = require('../actions');

const signUp = ( req, res ) => {
  Auth.signup(req.body)
    .then( (token) => {
      res.status(201).json({token, message: 'User created' })
      }
    )
    .catch((error) => res.status(404).json({error}))
}

module.exports = {
  signUp
}
