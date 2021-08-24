import axios from 'axios';

import {
    ALL_DISHES_REQUEST,
    ALL_DISHES_SUCCESS,
    ALL_DISHES_FAIL,
    ADMIN_DISHES_REQUEST,
    ADMIN_DISHES_SUCCESS,
    ADMIN_DISHES_FAIL,
    NEW_DISH_REQUEST,
    NEW_DISH_SUCCESS,
    NEW_DISH_FAIL,
    DELETE_DISH_REQUEST,
    DELETE_DISH_SUCCESS,
    DELETE_DISH_FAIL,
    UPDATE_DISH_REQUEST,
    UPDATE_DISH_SUCCESS,
    UPDATE_DISH_FAIL,
    DISH_DETAILS_REQUEST,
    DISH_DETAILS_SUCCESS,
    DISH_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../constants/dishConstants'

export const getDishes = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {

        dispatch({ type: ALL_DISHES_REQUEST })

        let Link = `/api/v1/dishes?keyword=${keyword}&page=${currentPage}`

        const { data } = await axios.get(Link);

        dispatch({
            type: ALL_DISHES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_DISHES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newDish = (dishData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_DISH_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/dish/new`, dishData, config)

        dispatch({
            type: NEW_DISH_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_DISH_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete dish (Admin)
export const deleteDish = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_DISH_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/dish/${id}`)

        dispatch({
            type: DELETE_DISH_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_DISH_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Dish (ADMIN)
export const updateDish = (id, dishData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_DISH_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/dish/${id}`, dishData, config)

        dispatch({
            type: UPDATE_DISH_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_DISH_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getDishDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: DISH_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/dish/${id}`);
        // const { data } = await axios.get(`/api/v1/dish/60f66f5ab8685f07684fc6ef`);

        dispatch({
            type: DISH_DETAILS_SUCCESS,
            payload: data.dish
        })

    } catch (error) {
        dispatch({
            type: DISH_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminDishes = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_DISHES_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/dishes`)

        dispatch({
            type: ADMIN_DISHES_SUCCESS,
            payload: data.dishes
        })

    } catch (error) {

        dispatch({
            type: ADMIN_DISHES_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get dish reviews
export const getDishReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_REVIEWS_REQUEST })

        const { data } = await axios.get(`/api/v1/reviews?id=${id}`)

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {

        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete dish review
export const deleteReview = (id, dishId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/v1/reviews?id=${id}&dishId=${dishId}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        console.log(error.response);

        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}