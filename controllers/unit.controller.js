const db = require('../models');
const queryParam = require('../helpers/get-query-parameter.util');
const Unit = db.units;
const Op = db.Sequelize.Op;

// Create and Save a new Unit
exports.create = (req, res) => {
  // Validate request
  if (!req.body.arabicName) {
    res.status(400).send({
      message: 'Arabic name is required',
    });
    return;
  } else if (!req.body.englishName) {
    res.status(400).send({
      message: 'English name is required',
    });
    return;
  }

  // Create a unit
  const unit = {
    arabicName: req.body.arabicName,
    englishName: req.body.englishName,
  };

  // Save unit in the database
  Unit.create(unit)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the unit.',
      });
    });
};

// Retrieve all units from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? {
        [Op.or]: [
          {
            arabicName: {
              [Op.iLike]: `%${name}%`,
            },
          },
          {
            englishName: {
              [Op.iLike]: `%${name}%`,
            },
          },
        ],
      }
    : null;

  Unit.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};

// Find a single Unit with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Unit.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Unit with id=' + id,
      });
    });
};

// Update a Unit by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.body.id;

    // Validate request
    if (!req.body.arabicName) {
      res.status(400).send({
        message: 'Arabic name is required',
      });
      return;
    } else if (!req.body.englishName) {
      res.status(400).send({
        message: 'English name is required',
      });
      return;
    }

    await Unit.update(req.body, {
      where: { id: id },
    });

    const unit = await Unit.findByPk(id);
    res.json({ data: unit, status: 'success' });
  } catch (error) {
    res.status(500).send({
      message: 'Error updating Unit with id=' + id,
    });
  }
};

// Delete a Unit with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Unit.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Unit was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Unit with id=${id}. Maybe Unit was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Unit with id=' + id,
      });
    });
};

// Delete selected products in the request
exports.deleteSelectedProducts = async (req, res) => {
  try {
    const units = await queryParam.getQueryParamAsIntArray(req, 'units');

    await Unit.destroy({
      where: {
        id: {
          [Op.in]: units,
        },
      },
    });

    res.json({ data: units, status: 'success' });
  } catch (error) {
    res.status(500).send({
      message: 'Error Deleting selected Units',
    });
  }
};
