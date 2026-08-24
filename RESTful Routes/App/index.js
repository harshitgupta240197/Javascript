const express = require('express')
const app = express()
const path = require('path')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const comments = [
    {
        username: 'Harshit',
        comment: 'Hey how are you doing ?'
    },
    {
        username: 'Messi',
        comment: 'I love football'
    },
    {
        username: 'Ronaldo',
        comment: 'Hey I can beat Messi at football'
    },
    {
        username: 'Drake',
        comment: 'Gods Plan!'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', {comments})
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body
    comments.push({ username, comment })
    res.redirect('/comments')
})

app.get('/cars', (req, res) => {
    res.send('GET /cars response')
})

app.post('/cars', (req, res) => {
    const { brand, quantity } = req.body

    res.send(`Here is ${brand} with ${quantity} in number`)
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
})