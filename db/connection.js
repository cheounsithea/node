
const mysql = require('mysql')

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '',
        database: 'test',
        charset: 'utf8',
        debug: false,
        timezone: '+07:00',
        dateStrings: true,
    },
  });


// knex.Promise.config({
//     cancellation: true
// });

module.exports = knex;