const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    userName: String,
    userAvatar: String
}, {
    timestamps: true
})

const restaurantSchema = new Schema({
    name: { 
        type: String, 
        required: true 
     },

    address: {
        type: String,
    },

    image: {
        type: String,
    },
    
    neighborhood: { 
        type: String,
        enum: ['Mission', 'The Richmond', 'Sunset'],
        required: true 
    },

    proteins: [{
        type: String,
    }],
    
    super: {
        type: Boolean,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },

    reviews: [reviewSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);