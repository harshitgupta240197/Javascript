const express = require('express')
// We need to call express and store it in app
const app = express()
// console.dir(app)

// Parse incoming requests
// app.use((req, res) => {
//     console.log('We got a new request')
//     // res.send('Hey! We got your response')
//     // res.send({color: 'red'})
//     res.send('<h1>This is my webpage</h1>')
// })

// GET REQUESTS

app.get('/', (req, res) => {
    res.send('This is the home page')
})

app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`)
})

app.get('/dogs', (req, res) => {
    res.send('Hey there')
})

app.get('/cows', (req, res) => {
    res.send('MAWWWW')
})

// QUERY STRING
app.get('/search', (req, res) => {
    // console.log(req.query);
    const {q} = req.query;
    if (!q) {
        res.send('Nothing found if nothing searched!')
    }
    res.send(`<h1>Search results for ${q}</h1>`)
})

// POST REQUEST

app.post('/dogs', (req, res) => {
    res.send('This is a post request')
})

// GENERIC REQUEST
app.get('/{*path}', (req, res, next) => {
    res.send('Oops We Dont Know This Path')
})

// We will listen on localhost 3000
app.listen(3000, () => {
    console.log('Listening on Port 3000');
})

