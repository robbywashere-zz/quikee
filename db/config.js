const config = require('config');

const nodeEnv = config.get('NODE_ENV');


if (!['production','development','test'].some((x) => x === nodeEnv)) {
  throw new Error(`NODE_ENV ${nodeEnv} does not comply with db configs`)
}

const dbConfig = {
  development: {
    database: 'quikee_database_dev',
      username: 'quikee_user',
      password: null,
      dialect: 'postgres',
      host: '127.0.0.1',
      logging: false,
  },
  test: {
    database: 'quikee_database_test',
      username: 'quikee_user',
      password: null,
      dialect: 'postgres',
      host: '127.0.0.1',
      logging: false,
  },
  production: {
    database: 'quikee_database_production',
      username: 'quikee_user',
      dialect: 'postgres',
      password: null,
      host: '127.0.0.1',
      logging: false,
  }
}

module.exports = dbConfig[nodeEnv];
