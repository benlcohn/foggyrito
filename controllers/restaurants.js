const Restaurant = require('../models/restaurant')
const ROOT_URL = 'https://api.yelp.com/v3/businesses/search?term=';

module.exports = {
    index,
    show,
    new: newRestaurant,
    create,
    searchAPI
};

async function index(req, res) {
    const restaurants = await Restaurant.find({});
    res.render('restaurants/index', { title: 'Restaurants', restaurants });
};

function newRestaurant(req, res) {
    const restaurant = null
    res.render('restaurants/new', { title: 'Add Restaurant', restaurant, errorMsg: ''});
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

async function show(req, res) {
    const restaurant = await Restaurant.findById(req.params.id);
    res.render('restaurants/show', { title: 'Restaurant Detail', restaurant });
}

async function searchAPI(req, res) {
    const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    };
    console.log(req.query.search)
    const restaurant = await fetch(`${ROOT_URL}/${req.query.search}&location=SF&limit=1`, options)
    .then(res => res.json());
    console.log(restaurant);

    res.render('restaurants/new', { restaurant: restaurant.businesses[0], title: 'Add Restaurant' });
  }