'use strict';
const mongoose = require('mongoose');
// const dbURL = process.env.dbURL;

mongoose.connect("mongodb://localhost:27017/doodle", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log(`DB Connected!`);
});

mongoose.connection.on('disconnected', () => {
    console.log(`DB Disconnected`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Error while connecting ${err}`);
});

