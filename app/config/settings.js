const path = require('path');
const constants = require('../utils/helpers/constants');

let rootPath = path.normalize(path.join(__dirname, '/../../'));

module.exports = {
  development: {
    rootPath: rootPath,
    db: constants.dbConstants.DB_CONNECTION_STRING,
    port: constants.dbConstants.DB_PORT
  },
  staging: {
  },
  production: {
    port: process.env.PORT
  }
};
