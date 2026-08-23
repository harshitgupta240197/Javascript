const express = require('express')
const app = express()
const path = require('path')

// Setting EJS as the View Engine
app.set('view engine', 'ejs')

// Explicitly define the views directory
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1
    res.render('random', {num})
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.render('subreddit', { subreddit })
})

app.get('/dogs', (req, res) => {
    const dogs = [
        'jack', 'yale', 'harvey', 'joey'
    ]
    res.render('dogs', { dogs })
})

app.listen(3000, () => {
    console.log('Listening on Port 3000');
})