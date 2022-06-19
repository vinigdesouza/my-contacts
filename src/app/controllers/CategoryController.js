const CategoryRepositories = require('../repositories/CategoryRepositories');
require('express-async-errors');

class CategoryController {
  async index(request, response) {
    const categories = await CategoryRepositories.findByAll();
    return response.json(categories);
  }

  // Error handler(middleware express) -> Manipulador de error -> usar no lugar do try catch

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoryRepositories.findByName(name);

    if (categoryExists) {
      return response.status(400).json({ error: 'This category already exists' });
    }

    const category = await CategoryRepositories.create(name);
    return response.json(category);
  }
}

module.exports = new CategoryController();
