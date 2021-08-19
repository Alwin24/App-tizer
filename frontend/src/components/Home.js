import React, { Fragment, useState, useEffect } from 'react'

import MetaData from './layout/MetaData'
import Dish from './dish/Dish'
import Loader from './layout/Loader'
import Pagination from 'react-js-pagination'

import { useDispatch, useSelector } from 'react-redux'
import { getDishes } from '../actions/dishActions';
import { useAlert } from 'react-alert';

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, dishes, error, dishesCount, resPerPage } = useSelector(state => state.dishes)

    const keyword = match.params.keyword

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }

        dispatch(getDishes(keyword, currentPage));

    }, [dispatch, alert, error, keyword, currentPage])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = dishesCount

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>

                    <MetaData title={'Buy Best Dishes Online'} />
                    {keyword ? (<h2 id="dishes_heading">Search Results for <i>{keyword}</i></h2>) :
                        (<h2 id="dishes_heading">Best Dishes</h2>)}

                    <section id="dishes" background="https://res.cloudinary.com/alwin24/image/upload/v1628521458/avatars/background3_zokyoy.jpg" className="container mt-5">
                        <div className="row">

                            {dishes.map(dish => (<Dish key={dish._id} dish={dish} col={4} />))}

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

