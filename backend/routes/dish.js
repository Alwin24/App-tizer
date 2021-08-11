const express = require('express');
const router = express.Router();

const {
    getDishes,
    newDish,
    getSingleDish,
    updateDish,
    deleteDish,
    createDishReview,
    getDishReviews,
    deleteReview
} = require('../controllers/dishController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/dishes').get(getDishes);

router.route('/admin/dish/new').post(isAuthenticatedUser, authorizeRoles('admin'), newDish);

router.route('/dish/:id').get(getSingleDish);

router.route('/admin/dish/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateDish)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteDish);

router.route('/review').put(isAuthenticatedUser, createDishReview);

router.route('/reviews')
    .get(isAuthenticatedUser, getDishReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;