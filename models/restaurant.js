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
        required: true
    },
    userName: String,
    userAvatar: String
}, {
    timeStamps: true
})

const restaurantSchema = new Schema({
    name: { 
        type: String, 
        required: true 
     },
    
    address: { 
        type: String, 
        required: true 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);