const express = require('express')
// We need to call express and store it in app
const app = express()
// console.dir(app)

// Parse incoming requests
app.use((req, res) => {
    console.log('We got a new request')
    // res.send('Hey! We got your response')
    // res.send({color: 'red'})
    res.send('<h1>This is my webpage</h1>')
})

// We will listen on localhost 3000
app.listen(3000, () => {
    console.log('Listening on Port 3000');
})

