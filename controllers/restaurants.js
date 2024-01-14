const Restaurant = require('../models/restaurant')

module.exports = {
    index,
    new: newRestaurant,
};

async function index(req, res) {
    const restaurants = await Restaurant.find({});
    res.render('restaurants/index', { title: 'Restaurants', restaurants });
};

function newRestaurant(req, res) {
    res.render('restaurants/new', { title: 'Add Restaurant', errorMsg: ''});
}

async function create(req, res) {
    const restaurant = await Restaurant.findById(req.params.id);

    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }

    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    try {
        const restaurant = await Restaurant.create(req.body);
        res.redirect(`/restaurants/${restaurant.id}`, { title: 'New Restaurant', restaurant });
    } catch (err) {
        console.log(err);
        res.render('restaurants/new', { errorMsg: err.message });
    }
}