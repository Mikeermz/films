const { Auth } = require('../actions');

const signUp = ( req, res ) => {
  Auth.signup(req.body)
    .then( (token) => {
      res.status(201).json({token, message: 'User created' })
      }
    )
    .catch((error) => res.status(404).json({error}))
}

const login = ( req, res) => {
  Auth.login(req.body)
    .then( (token) => {
      res.status(200).json({token, message: 'User logged' })
      }
    )
    .catch((error) => {
      console.log(error)
      return res.status(401).json({error})
    })
}

module.exports = {
  signUp,
  login
}
