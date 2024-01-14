const Restaurant = require('../models/restaurant')

module.exports = {
    index,
    new: newRestaurant,
    create,
    searchAPI
};

async function index(req, res) {
    const restaurants = await Restaurant.find({});
    res.render('restaurants/index', { title: 'Restaurants', restaurants });
};

function newRestaurant(req, res) {
    res.render('restaurants/new', { title: 'Add Restaurant', errorMsg: ''});
}

async function create(req, res) {
    const restaurant = new Restaurant(req.body);
    restaurant.user = req.user._id;
    try {
        await restaurant.save();
        res.redirect(`/restaurants/${restaurant.id}`);
    } catch (err) {
        console.log(err);
        res.render('restaurants/new', { errorMsg: err.message });
    }
}

async function searchAPI(req, res) {

}