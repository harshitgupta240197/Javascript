const mongoose = require('mongoose');

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

// // New product
// const p = new Product({
//     name: 'Grapefruit',
//     price: 100,
//     category: 'fruit'
// })

// // Save the product to the DB
// p.save().then(p => {
//     console.log(p);
// })
//     .catch(e => {
//         console.log(e);
//     })

const seedProducts = [
    {
        name: 'Egg Plant',
        price: 200,
        category: 'vegetable'
    },
    {
        name: 'Apple',
        price: 100,
        category: 'fruit'
    },
    {
        name: 'Eggs',
        price: 210,
        category: 'dairy'
    },
    {
        name: 'Orange',
        price: 400,
        category: 'fruit'
    },
    {
        name: 'Tomato',
        price: 200,
        category: 'vegetable'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    }) 
    .catch(e => {
        console.log(e);        
    })