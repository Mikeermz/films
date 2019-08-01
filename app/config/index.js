const NODE_ENV = process.env.NODE_ENV || 'dev';

const ENVS = {
  dev: {
    db: {
      url: process.env.URL_MONGO
    },
    port: process.env.PORT
  },
  test: {

  },
  production: {

  }
}

module.exports = ENVS[NODE_ENV];
