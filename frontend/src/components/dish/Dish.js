import React from 'react'
import { Link } from 'react-router-dom'

const Dish = ({ dish, col }) => {
    return (
        <div className={`col-sm-12 col-md-8 col-lg-${col} my-3`}>
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={dish.images[0].url}
                    alt="dish thumbnail"
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/dish/${dish._id}`}>{dish.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(dish.ratings * 20)}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({dish.numOfReviews} Reviews)</span>
                    </div>
                    <p className="card-text">₹{dish.price}</p>
                    <Link to={`/dish/${dish._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
    )
}

export default Dish
