const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors} = require('./seedHelpers')

// Connection details:
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

    .then(() => {
        console.log('Database Connected');
    })
    .catch(err => {
        console.log('Error in connecting to the database!');
        console.log(err);
    })

// Creating a RANDOM function
const sample = array => array[Math.floor(Math.random() * array.length)];


// Im the seed DB first we will delete everything
const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

// Since this a seedDB so we will close the connection
seedDB().then(() => {
    mongoose.connection.close()
})