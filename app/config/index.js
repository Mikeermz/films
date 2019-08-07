const NODE_ENV = process.env.NODE_ENV || 'dev';

const ENVS = {
  dev: {
    SECRET_KEY: 'M4RM900130',
    db: {
      url: process.env.URL_MONGO
    },
    port: process.env.PORT
  },
  test: {
  },
  production: {
  }
};

module.exports = ENVS[NODE_ENV];
