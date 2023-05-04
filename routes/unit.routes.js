module.exports = (app) => {
  const units = require('../controllers/unit.controller');

  let router = require('express').Router();

  // Create a new Unit
  router.post('/', units.create);

  // Retrieve all Tutorials
  router.get('/', units.findAll);

  // Retrieve a single Unit with id
  router.get('/:id', units.findOne);

  // Update a Unit with id
  router.put('/', units.update);

  // Delete array of selected products
  router.delete('/delete-selected-products', units.deleteSelectedProducts);

  // Delete a Unit with id
  router.delete('/:id', units.delete);

  app.use('/api/units', router);
};
