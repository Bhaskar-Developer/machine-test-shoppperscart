const pg = require('pg');

class Pool {
  _pool = null;

  connect(options) {
    this._pool = new pg.Pool(options);
    // establish a valid connection to PostgreSQL
    return this._pool.query(`SELECT 1 + 1`);
  }

  close() {
    return this._pool.end();
  }
  query(sql, params) {
    return this._pool.query(sql, params);
  }
}

module.exports = new Pool();
