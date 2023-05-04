module.exports = (sequelize, Sequelize) => {
  const Unit = sequelize.define('unit', {
    arabicName: {
      type: Sequelize.STRING,
    },
    englishName: {
      type: Sequelize.STRING,
    },
  });

  return Unit;
};
