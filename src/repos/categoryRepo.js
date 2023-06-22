const pool = require('../pool');

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
    const updatesKeys = Object.keys(updates);
    const count = updatesKeys.length;
    let query = `UPDATE categories SET `;
    let parameterIterator = 1;
    let paramsArray = [];

    // Dynamically construct query based on updates
    for (let update in updates) {
      let fieldUpdate =
        parameterIterator === count
          ? `${update} = $${parameterIterator} `
          : `${update} = $${parameterIterator}, `;
      paramsArray.push(updates[update]);
      parameterIterator++;
      query = query + fieldUpdate;
    }

    // add where clause to query
    query = query + `WHERE id = $${parameterIterator};`;
    // add id param to params array
    paramsArray.push(id);

    // console.log('query', query);
    // console.log('paramsArray', paramsArray);

    await pool.query(query, [...paramsArray]);
  }

  async findByIdAndDelete(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
  }
}

module.exports = new CategoryRepo();
