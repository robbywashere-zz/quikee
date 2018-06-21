const slurpDir = require('../lib/slurpDir');
const DB = require('../db');
const Models = { };

slurpDir(__dirname)(modelFn => {
 let model = modelFn(DB);
  Models[model.name] = model;
});

module.exports = Models;

