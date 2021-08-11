import {
    ALL_DISHES_REQUEST,
    ALL_DISHES_SUCCESS,
    ALL_DISHES_FAIL,
    DISH_DETAILS_REQUEST,
    DISH_DETAILS_SUCCESS,
    DISH_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/dishConstants'

export const dishesReducer = (state = { dishes: [] }, action) => {
    switch (action.type) {
        case ALL_DISHES_REQUEST:
            return {
                loading: true,
                dishes: []
            }

        case ALL_DISHES_SUCCESS:

            return {
                loading: false,
                dishes: action.payload.dishes,
                dishesCount: action.payload.dishesCount,
                resPerPage: action.payload.resPerPage,
                filteredDishesCount: action.payload.filteredDishesCount
            }
        case ALL_DISHES_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const dishDetailsReducer = (state = { dish: {} }, action) => {
    switch (action.type) {
        case DISH_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DISH_DETAILS_SUCCESS:
            return {
                loading: false,
                dish: action.payload
            }
        case DISH_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}