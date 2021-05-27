'use strict';
const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');


app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('dotenv').config();
require('./config/db.mongoose');
require('./config/routes')(app);
require('./config/errorHandler')(app);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
