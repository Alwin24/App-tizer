const Dish = require('../models/dish');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const dishes = require('../data/dishes.json');
const { connect } = require('mongoose');

dotenv.config({ path: 'backend/config/config.env' });

connectDatabase();

const seedDishes = async () => {
    try {
        await Dish.deleteMany();
        console.log('All dishes have been deleted.');
        await Dish.insertMany(dishes);
        console.log('Dishes have been added.');
        process.exit();
    }
    catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedDishes();