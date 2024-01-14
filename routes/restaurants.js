const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../ghost/restaurants');
const ensureLoggedIn = require('../config/ensureLoggedIn');


// GET /restaurants
router.get('/', restaurantsCtrl.index);
// GET /restaurants/new
router.get('/new', ensureLoggedIn, restaurantsCtrl.new);
// GET 
router.get('/search', ensureLoggedIn, restaurantsCtrl.searchAPI)
// POST
router.post('/', ensureLoggedIn, restaurantsCtrl.create);

module.exports = router;