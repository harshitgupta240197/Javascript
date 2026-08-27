const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')

// Connection details:
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

    .then(() => {
        console.log('Database Connected');
    })
    .catch(err => {
        console.log('Error in connecting to the database!');
        console.log(err);
    })

// Setting up the view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Home page
app.get('/', (req, res) => {
    res.render('home')
})

// Making New Campground
app.get('/makecampground', async (req, res) => {
    const camp = new Campground({})
    await camp.save()
    res.send(camp)
})

// Port set up
app.listen(3000, () => {
    console.log('serving on PORT 3000');
})