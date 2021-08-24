import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminDishes, deleteDish, clearErrors } from '../../actions/dishActions'
import { DELETE_DISH_RESET } from '../../constants/dishConstants'

const DishesList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, dishes } = useSelector(state => state.dishes);
    const { error: deleteError, isDeleted } = useSelector(state => state.dish)

    useEffect(() => {
        dispatch(getAdminDishes());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Dish deleted successfully');
            history.push('/admin/dishes');
            dispatch({ type: DELETE_DISH_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setDishes = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        dishes.forEach(dish => {
            data.rows.push({
                id: dish._id,
                name: dish.name,
                price: `₹${dish.price}`,
                stock: dish.stock,
                actions: <Fragment>
                    <Link to={`/admin/dish/${dish._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteDishHandler(dish._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteDishHandler = (id) => {
        dispatch(deleteDish(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Dishes'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Dishes</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setDishes()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default DishesList
