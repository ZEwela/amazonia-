import mongoose from 'mongoose';
const validator = require('validator');

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Product name required'],
    },
    image: {
        type: String, 
        required: [true, 'Product image required'],
    },
    brand: {
        type: String, 
        required: [true, 'Product brand required'],
    },
    price: {
        type: Number, 
        required: [true, 'Product price required'],
    },
    category: {
        type: String, 
        required: [true, 'Product category required'],
    },
    countInStock: {
        type: Number, 
        default: 0, 
        required: [true, 'Product count in stock required'],
    },
    description: {
        type: String, 
        required: [true, 'Product description required'],
    },
    rating: {type: Number, default: 0, required: true},
    numReviews: {type: Number, default: 0, required: true},

});

const productModel = mongoose.model("Product", productSchema);

export default productModel;

