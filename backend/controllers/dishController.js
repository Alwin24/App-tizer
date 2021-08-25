const Dish = require('../models/dish');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');

exports.newDish = catchAsyncErrors(async (req, res, next) => {

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'dishes'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id;

    const dish = await Dish.create(req.body);

    res.status(201).json({
        success: true,
        dish
    })
})

exports.getDishes = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 3;
    const dishesCount = await Dish.countDocuments();

    const apiFeatures = new APIFeatures(Dish.find(), req.query)
        .search()

    let dishes = await apiFeatures.query

    apiFeatures.pagination(resPerPage)
    dishes = await apiFeatures.query;

    res.status(200).json({
        success: true,
        dishesCount,
        resPerPage,
        dishes
    })

})

exports.getAdminDishes = catchAsyncErrors(async (req, res, next) => {

    const dishes = await Dish.find();

    res.status(200).json({
        success: true,
        dishes
    })

})

exports.getSingleDish = catchAsyncErrors(async (req, res, next) => {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
        return next(new ErrorHandler('Dish not found', 404));
    }
    res.status(200).json({
        success: true,
        dish
    })
})

exports.updateDish = catchAsyncErrors(async (req, res, next) => {

    let dish = await Dish.findById(req.params.id);

    if (!dish) {
        return next(new ErrorHandler('Dish not found', 404));
    }

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the dish
        for (let i = 0; i < dish.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(dish.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'dishes'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }

    dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        dish
    })

})

exports.deleteDish = catchAsyncErrors(async (req, res, next) => {

    const dish = await Dish.findById(req.params.id);

    if (!dish) {
        return next(new ErrorHandler('Dish not found', 404));
    }

    // Deleting images associated with the dish
    for (let i = 0; i < dish.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(dish.images[i].public_id)
    }

    await dish.remove();

    res.status(200).json({
        success: true,
        message: 'Dish is deleted.'
    })

})

exports.createDishReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, dishId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const dish = await Dish.findById(dishId);

    const isReviewed = dish.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        dish.reviews.forEach((review) => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    } else {
        dish.reviews.push(review);
        dish.numOfReviews = dish.reviews.length;
    }

    dish.ratings = dish.reviews.reduce((acc, item) => item.rating + acc, 0) / dish.reviews.length;

    await dish.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })
})

exports.getDishReviews = catchAsyncErrors(async (req, res, next) => {
    const dish = await Dish.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: dish.reviews
    })
})

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const dish = await Dish.findById(req.query.dishId);

    const reviews = dish.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = dish.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await Dish.findByIdAndUpdate(req.query.dishId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    });

    res.status(200).json({
        success: true
    })
})

