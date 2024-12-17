import knex from 'knex';
const knexConfig = require('../../knexfile.js');

const db = knex(knexConfig['development']);
export default db;
