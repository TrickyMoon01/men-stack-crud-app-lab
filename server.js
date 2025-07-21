const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});


// Import the car model
const Car = require('./models/car.js');

// GET /
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

// GET /cars/new
app.get('/cars/new', (req, res) => {
    res.render('cars/new.ejs');
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});