var mysql = require('mysql');


var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'remotemysql.com',
  user: 'duhWOnxBlB',
  password: '75cERabVfP',
  database: 'duhWOnxBlB'
});
exports.pool = pool;