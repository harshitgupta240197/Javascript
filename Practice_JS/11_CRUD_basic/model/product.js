const mongoose = require('mongoose')

// New Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        lowercase: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
})

// to complete the model
const Product = mongoose.model('Product', productSchema);

// export the model
module.exports = Product;