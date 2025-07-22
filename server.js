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

// adding middleware for app
app.use(express.urlencoded({ extended: false }));


// GET /
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get('/cars', async (req, res) => {
    const allCars = await Car.find({});
    res.render('cars/index.ejs', { cars: allCars });
});

// GET /cars/new
app.get('/cars/new', (req, res) => {
    res.render('cars/new.ejs');
});

// POST /cars
app.post('/cars', async (req, res) => {
    if (req.body.isReadyToDrive === 'on') {
        req.body.isReadyToDrive = true;
    } else {
        req.body.isReadyToDrive = false;
    }

    await Car.create(req.body);
    res.redirect('/cars');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});