const express = require('express');
const cors = require('cors');
const dataBase = require('./models');
const app = express();

var corsOptions = {
  origin: 'http://localhost:4200',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// async sequelize database to be fetch models
dataBase.sequelize.sync();

// set api routes
require('./routes/unit.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
