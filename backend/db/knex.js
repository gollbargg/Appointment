const knex = require('knex');
const knexfile = require('../knexfile');

// Choose the configuration based on the NODE_ENV or default to 'development'
const environment = process.env.NODE_ENV || 'development';
const config = knexfile[environment];

module.exports = knex(config);
