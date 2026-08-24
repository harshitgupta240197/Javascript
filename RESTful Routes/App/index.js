const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/cars', (req, res) => {
    res.send('GET /cars response')
})

app.post('/cars', (req, res) => {
    const { brand, quantity} = req.body
    
    res.send(`Here is ${brand} with ${quantity} in number`)
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
})