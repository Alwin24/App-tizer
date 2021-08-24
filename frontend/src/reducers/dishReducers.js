import {
    ALL_DISHES_REQUEST,
    ALL_DISHES_SUCCESS,
    ALL_DISHES_FAIL,
    ADMIN_DISHES_REQUEST,
    ADMIN_DISHES_SUCCESS,
    ADMIN_DISHES_FAIL,
    NEW_DISH_REQUEST,
    NEW_DISH_SUCCESS,
    NEW_DISH_RESET,
    NEW_DISH_FAIL,
    DELETE_DISH_REQUEST,
    DELETE_DISH_SUCCESS,
    DELETE_DISH_RESET,
    DELETE_DISH_FAIL,
    UPDATE_DISH_REQUEST,
    UPDATE_DISH_SUCCESS,
    UPDATE_DISH_RESET,
    UPDATE_DISH_FAIL,
    DISH_DETAILS_REQUEST,
    DISH_DETAILS_SUCCESS,
    DISH_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS

} from '../constants/dishConstants'

export const dishesReducer = (state = { dishes: [] }, action) => {
    switch (action.type) {
        case ALL_DISHES_REQUEST:
        case ADMIN_DISHES_REQUEST:
            return {
                loading: true,
                dishes: []
            }

        case ALL_DISHES_SUCCESS:
            return {
                loading: false,
                dishes: action.payload.dishes,
                dishesCount: action.payload.dishesCount,
                resPerPage: action.payload.resPerPage
            }

        case ADMIN_DISHES_SUCCESS:
            return {
                loading: false,
                dishes: action.payload
            }

        case ALL_DISHES_FAIL:
        case ADMIN_DISHES_FAIL:
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

export const newDishReducer = (state = { dish: {} }, action) => {
    switch (action.type) {

        case NEW_DISH_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_DISH_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                dish: action.payload.dish
            }

        case NEW_DISH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case NEW_DISH_RESET:
            return {
                ...state,
                success: false
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

export const dishReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_DISH_REQUEST:
        case UPDATE_DISH_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_DISH_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_DISH_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_DISH_FAIL:
        case UPDATE_DISH_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_DISH_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_DISH_RESET:
            return {
                ...state,
                isUpdated: false
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

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
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

export const dishReviewsReducer = (state = { review: [] }, action) => {
    switch (action.type) {

        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }

        case GET_REVIEWS_FAIL:
            return {
                ...state,
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

export const reviewReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
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