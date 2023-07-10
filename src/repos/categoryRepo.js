const pool = require('../pool');
const queryConstructor = require('../utils/queryConstructor');

class CategoryRepo {
  async find() {
    const { rows } = await pool.query(`SELECT id,name FROM categories;`);
    return rows;
  }

  async findById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM categories WHERE id = $1;`,
      [id]
    );
    return rows[0];
  }

  async create(name) {
    await pool.query('INSERT INTO categories (name) VALUES ($1);', [name]);
  }

  async findByIdAndUpdate(id, updates) {
    const { query, paramsArray } = queryConstructor(updates, id, 'categories');
    await pool.query(query, [...paramsArray]);
  }

  async findByIdAndDelete(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
  }
}

module.exports = new CategoryRepo();
