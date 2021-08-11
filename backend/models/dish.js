const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter dish name'],
        trim: true,
        maxLength: [100, 'Dish name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter dish price'],
        maxLength: [5, 'Dish price cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter dish description']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    cuisine: {
        type: String,
        required: [true, 'Please select a cuisine'],
        enum: {
            values: [
                'chinese',
                'indian',
                'mexican',
                'arabian',
                'american'
            ],
            message: 'Please select correct cuisine'
        }
    },
    restaurant: {
        type: String,
        required: [true, 'Please enter dish restaurant name']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter dish stock'],
        maxLength: [5, 'Stock nubmer cannot excees 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false //change this to false for =>  npm run seeder
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Dish', dishSchema);