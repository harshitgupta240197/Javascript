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

app.listen(3000, () => {
    console.log('Listening on Port 3000');
})