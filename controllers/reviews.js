const Restaurant = require('../models/restaurant');


module.exports = {
    create,
    remove,
    edit,
    update
}

async function create(req, res) {
    const restaurant = await Restaurant.findById(req.params.id);

    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    restaurant.reviews.push(req.body);
    try {
        await restaurant.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/restaurants/${restaurant._id}`);
}

async function remove(req, res) {
    const restaurant = await Restaurant.findOne({'reviews._id': req.params.reviewId, 'reviews.user': req.user._id});
    if (!restaurant) return res.redirect(`/restaurants/${restaurant._id}`);
    restaurant.reviews.remove(req.params.id);
    await restaurant.save();
    res.redirect(`/restaurants/${restaurant._id}`);
}

async function edit(req, res) {
    const restaurant = await Restaurant.findOne({'reviews._id': req.params.reviewId, 'reviews.user': req.user._id});
    const review = restaurant.reviews.id(req.params.reviewId);
    // render /reviews/edit.ejs
    res.render('reviews/edit', { title: 'Edit Review', review, restaurant });
}

async function update(req, res) {
    const restaurant = await Restaurant.findOne({'reviews._id': req.params.reviewId});
    const reviewSubdoc = restaurant.reviews.id(req.params.reviewId);

    if (!reviewSubdoc.user.equals(req.user._id)) return res.redirect(`/restaurants/${restaurant._id}`);
    // Update the text in review
    reviewSubdoc.content = req.body.content;
    try {
        await restaurant.save();
    } catch (err) {
        console.log(err.message);
    }
    // Redirect back to show view
    res.redirect(`/restaurants/${restaurant._id}`);
}