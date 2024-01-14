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
    req.body.super = !!req.body.super;
    const proteins = [];
    proteins.push(!!req.body.protein1, !!req.body.protein2, !!req.body.protein3);
    req.body.proteins = proteins;
    req.body.user = req.user._id;
    const restaurant = new Restaurant(req.body);
    try {
        await restaurant.save();
        res.redirect(`/restaurants`);
    } catch (err) {
        console.log(err);
        res.render('restaurants/new', { errorMsg: err.message, title: 'Add Restaurant' });
    }
}

async function searchAPI(req, res) {

}