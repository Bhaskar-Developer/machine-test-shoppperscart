const pool = require('../pool');
const queryConstructor = require('../utils/queryConstructor');

class CategoryRepo {
  async find() {
    const { rows } =
      await pool.query(`select products.id as product_id, products.name as products_name , categories.name as categories_name , categories.id as categories_id
    from products
    inner join categories
    on products.id = categories.id
    offset 0
    limit 20;`);
    return rows;
  }

  async findById(id) {
    const { rows } = await pool.query(`SELECT * FROM products WHERE id = $1;`, [
      id,
    ]);
    return rows[0];
  }

  async create(name, categoryId) {
    await pool.query(
      'INSERT INTO products (name, category_id) VALUES ($1,$2);',
      [name, categoryId]
    );
  }

  async findByIdAndUpdate(id, updates) {
    const { query, paramsArray } = queryConstructor(updates, id, 'products');
    await pool.query(query, [...paramsArray]);
  }

  async findByIdAndDelete(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
  }
}

module.exports = new CategoryRepo();
