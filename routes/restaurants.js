const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../controllers/restaurants');


// GET /restaurants
router.get('/', restaurantsCtrl.index);

module.exports = router;