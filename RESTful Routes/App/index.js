const express = require('express')
const app = express()
const path = require('path')
const { v4: uuid} = require('uuid');
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const comments = [
    {
        id: uuid(),
        username: 'Harshit',
        comment: 'Hey how are you doing ?'
    },
    {
        id: uuid(),
        username: 'Messi',
        comment: 'I love football'
    },
    {
        id: uuid(),
        username: 'Ronaldo',
        comment: 'Hey I can beat Messi at football'
    },
    {
        id: uuid(),
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
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newCommentText;
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