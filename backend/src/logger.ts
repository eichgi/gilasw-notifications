const pino = require('pino');

module.exports = pino(
  {},
  pino.destination(`${__dirname}/notifications.log`)
);