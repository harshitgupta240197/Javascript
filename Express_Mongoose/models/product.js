const mongoose = require('mongoose')

// Prepare the schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
})

// Now we will compile our model
const Product = mongoose.model('Product', productSchema);

// Now we will export the model from this file
module.exports = Product;