const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST for creating new reviews
router.post('/restaurants/:id/reviews', ensureLoggedIn, reviewsCtrl.create);
router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.remove);

module.exports = router;