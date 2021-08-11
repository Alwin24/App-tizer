import axios from 'axios';

import {
    ALL_DISHES_REQUEST,
    ALL_DISHES_SUCCESS,
    ALL_DISHES_FAIL,
    DISH_DETAILS_REQUEST,
    DISH_DETAILS_SUCCESS,
    DISH_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/dishConstants'

export const getDishes = (keyword = '', currentPage = 1, price, cuisine, rating = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_DISHES_REQUEST })

        let Link = `/api/v1/dishes?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (cuisine) {
            Link = `/api/v1/dishes?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&cuisine=${cuisine}&ratings[gte]=${rating}`
        }

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

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}