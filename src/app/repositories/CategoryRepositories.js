const db = require('../../database');

class CategoriyRepositories {
  async findByAll() {
    const rows = await db.query('SELECT * FROM categories');
    return rows;
  }

  async findByName(name) {
    const [row] = await db.query('SELECT * FROM categories WHERE name = $1', [name]);
    return row;
  }

  async create(name) {
    const [row] = await db.query('INSERT INTO categories(name) values($1) RETURNING *', [name]);
    return row;
  }
}

module.exports = new CategoriyRepositories();
