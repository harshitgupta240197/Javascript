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

// Setting up the body parser
app.use(express.urlencoded({ extended: true }))

// Home page
app.get('/', (req, res) => {
    res.render('home')
})

// Campgrounds Page
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})

// Making New Campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

// End point for submitting form for new campground
app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
})

// Campgrounds by ID
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', { campground })
})

// Port set up
app.listen(3000, () => {
    console.log('serving on PORT 3000');
})