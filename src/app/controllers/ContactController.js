const ContactRepositories = require('../repositories/ContactRepositories');

class ContactController {
  async index(request, response) {
    // listar todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactRepositories.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    // obter um registro
    const { id } = request.params;
    const contact = await ContactRepositories.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }
    return response.json(contact);
  }

  async store(request, response) {
    // criar novo registro
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name || !email || !phone) {
      return response.status(400).json({ error: 'Name, phone and email are required' });
    }

    const contactExists = await ContactRepositories.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepositories.createContact(name, email, phone, category_id);
    return response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name || !email || !phone) {
      return response.status(400).json({ error: 'Name, phone and email are required' });
    }

    const contactExists = await ContactRepositories.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    const contactExistsByEmail = await ContactRepositories.findByEmail(email);

    if (contactExistsByEmail && contactExistsByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepositories.update(id, {
      name, email, phone, category_id,
    });

    return response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ContactRepositories.deleteById(id);

    return response.sendStatus(204);
  }
}

module.exports = new ContactController();
