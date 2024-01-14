const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../controllers/restaurants');
const ensureLoggedIn = require('../config/ensureLoggedIn');


// GET /restaurants
router.get('/', restaurantsCtrl.index);
// GET /restaurants/new
router.get('/new', ensureLoggedIn, restaurantsCtrl.new);
// POST
//router.post('/', ensureLoggedIn, restaurantsCtrl.create);

module.exports = router;