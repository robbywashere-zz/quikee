const config = require('config');
const dbParams = require('./dbParams.json');

const nodeEnv = config.get('NODE_ENV');


if (!['production','development','test'].some((x) => x === nodeEnv)) {
  throw new Error(`NODE_ENV ${nodeEnv} does not comply with db configs`)
}

const dbConfig = {
  ...dbParams
}


module.exports = dbConfig[nodeEnv];
