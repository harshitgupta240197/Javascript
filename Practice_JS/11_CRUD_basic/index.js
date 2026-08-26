const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

// import the product model
const Product = require('./model/product')

// Connection to mongoose server
mongoose.connect('mongodb://127.0.0.1:27017/productApp')

    .then(() => {
        console.log('MONGO CONNECTION OPEN!');
    })
    .catch(err => {
        console.log('Error!');
        console.log(err);
    })

// Setting up EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middleware
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));

// for the main products page
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', { products })
})

// for the submit button on the new product addition
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect('/products')
})

// for deleting an item
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

// Launching server to listen
app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})