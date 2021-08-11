import React, { Fragment, useState, useEffect } from 'react'

import MetaData from './layout/MetaData'
import Dish from './dish/Dish'
import Loader from './layout/Loader'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { useDispatch, useSelector } from 'react-redux'
import { getDishes } from '../actions/dishActions';
import { useAlert } from 'react-alert';

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [cuisine, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const cuisines = [
        'chinese',
        'indian',
        'mexican',
        'arabian',
        'american'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, dishes, error, dishesCount, resPerPage, filteredDishesCount } = useSelector(state => state.dishes)

    const keyword = match.params.keyword

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }

        dispatch(getDishes(keyword, currentPage, price, cuisine, rating));

    }, [dispatch, alert, error, keyword, currentPage, price, cuisine, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = dishesCount
    if (keyword) {
        count = filteredDishesCount
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>

                    <MetaData title={'Buy Best Dishes Online'} />
                    <h1 id="dishes_heading">Best Dishes<i class="fa-solid fa-right-to-bracket"></i></h1>
                    <section id="dishes" background="https://res.cloudinary.com/alwin24/image/upload/v1628521458/avatars/background3_zokyoy.jpg" className="container mt-5">
                        <div className="row">
                            {keyword ?
                                (
                                    <Fragment>
                                        <div className="col-6 col-md-3 mt-5 mb-5">
                                            <div className="px-5">
                                                <Range
                                                    marks={{
                                                        1: `₹1`,
                                                        1000: `₹1000`
                                                    }}
                                                    min={1}
                                                    max={1000}
                                                    defaultValue={[1, 1000]}
                                                    tipFormatter={value => `₹${value}`}
                                                    tipProps={{
                                                        placement: "top",
                                                        visible: true
                                                    }}
                                                    value={price}
                                                    onChange={price => setPrice(price)}
                                                />

                                                <hr className="my-5" />

                                                <div className="mt-5">
                                                    <h4 className="mb-3">
                                                        Categories
                                                    </h4>

                                                    <ul className="pl-0">
                                                        {cuisines.map(cuisine => (
                                                            <li
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    listStyleType: 'none'
                                                                }}
                                                                key={cuisine}
                                                                onClick={() => setCategory(cuisine)}
                                                            >{cuisine}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <hr className="my-3" />

                                                <div className="mt-5">
                                                    <h4 className="mb-3">
                                                        Ratings
                                                    </h4>

                                                    <ul className="pl-0">
                                                        {[5, 4, 3, 2, 1].map(star => (
                                                            <li
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    listStyleType: 'none'
                                                                }}
                                                                key={star}
                                                                onClick={() => setRating(star)}
                                                            >
                                                                <div className="rating-outer">
                                                                    <div className="rating-inner"
                                                                        style={{ width: `${star * 20}%` }}
                                                                    >
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-9">
                                            <div className="row">
                                                {dishes.map(dish => (
                                                    <Dish key={dish._id} dish={dish} col={5} />
                                                ))}
                                            </div>
                                        </div>
                                    </Fragment>
                                ) : (
                                    dishes.map(dish => (
                                        <Dish key={dish._id} dish={dish} col={4} />
                                    ))
                                )}
                        </div>
                    </section>
                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={dishesCount}
                                onChange={setCurrentPageNo}
                                // nextPageText={'Next'}
                                // prevPageText={'Prev'}
                                // firstPageText={'First'}
                                // lastPageText={'Last'}
                                itemClass='page-item'
                                linkClass='page-link'
                            />
                        </div>
                    )}
                </ Fragment>
            )}

        </Fragment>
    )
}

export default Home

