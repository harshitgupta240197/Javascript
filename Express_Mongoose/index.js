const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override')

// Import our Product model
const Product = require('./models/product')

// Connection details:
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')

    .then(() => {
        console.log('MONGO CONNECTION OPEN!');
    })
    .catch(err => {
        console.log('Error!');
        console.log(err);
    })

// Setting up the EJS view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Creating an array for Categories
const categories = ['fruit', 'vegetable', 'dairy']

// for the main products display page
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})

// for the page for adding new products
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

// For the SUBMIT FORM route for new product
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
})

// for the product details page per id
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product })
})

// for the product EDITING part
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', { product, categories })
})

// for submitting the EDITED form
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)
})

// for deleting a product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.listen(3000, () => {
    console.log('App is listening on PORT 3000');
})