const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: false },
    address: { type: String, required: true }
}, {
    timestamps: true
});

const reviewSchema = new Schema({

})

module.exports = mongoose.model('Restaurant', restaurantSchema);