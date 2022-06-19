const { Router } = require('express');
const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

const router = Router();

router.get(
  '/contacts',
  (request, response, next) => { // Middleware
    next();
  },
  ContactController.index,
);
router.get('/contacts/:id/', ContactController.show);
router.delete('/contacts/:id/', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

router.get('/category', CategoryController.index);
router.post('/category', CategoryController.store);

module.exports = router;
