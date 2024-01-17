const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST for creating new reviews
router.post('/restaurants/:id/reviews', ensureLoggedIn, reviewsCtrl.create);
router.delete('/reviews/:reviewId', ensureLoggedIn, reviewsCtrl.remove);
//  for editing existing reviews
router.get('/restaurants/:id/reviews/:reviewId/edit', ensureLoggedIn, reviewsCtrl.edit);
// PUT to make actual edit
router.put('/reviews/:reviewId', ensureLoggedIn, reviewsCtrl.update);

module.exports = router;