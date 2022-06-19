const db = require('../../database');

// const contacts = [
//   {
//     id: v4(),
//     name: 'Vinicius',
//     email: 'vini@mail.com',
//     phone: '999999999',
//     category_id: v4(),
//   },
//   {
//     id: v4(),
//     name: 'Jose',
//     email: 'Jose@mail.com',
//     phone: '999999999',
//     category_id: v4(),
//   },
// ];

class ContactRepositories {
  async findAll(order = 'ASC') {
    const description = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT c.*, cat.name as category_name FROM contacts c LEFT JOIN categories cat ON cat.id = c.category_id ORDER BY c.name ${description}`);
    return rows;
    // return new Promise((resolve) => {
    //   resolve(contacts);
    // });
  }

  async findById(id) {
    const [row] = await db.query('SELECT c.*, cat.name as category_name FROM contacts c LEFT JOIN categories cat ON cat.id = c.category_id WHERE c.id = $1', [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  async deleteById(id) {
    const row = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return row;
  }

  async createContact(name, email, phone, category_id) {
    const [row] = await db.query('INSERT INTO contacts(name, email, phone, category_id) VALUES($1, $2, $3, $4) RETURNING *', [name, email, phone, category_id]);

    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const row = await db.query('UPDATE contacts SET name = $2, email = $3, phone = $4, category_id = $5  WHERE id = $1 RETURNING *', [id, name, email, phone, category_id]);
    return row;
  }
}

module.exports = new ContactRepositories();
