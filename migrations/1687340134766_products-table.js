/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        category_id INTEGER NOT NULL REFERENCES categories(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        DROP TABLE products;
    `);
};
