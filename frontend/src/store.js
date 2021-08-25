import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import { dishesReducer, dishDetailsReducer, newReviewReducer, dishReducer, newDishReducer, reviewReducer, dishReviewsReducer } from './reducers/dishReducers';
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    dishes: dishesReducer,
    newDish: newDishReducer,
    dishDetails: dishDetailsReducer,
    dish: dishReducer,
    dishReviews: dishReviewsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    allUsers: allUsersReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    userDetails: userDetailsReducer,
    review: reviewReducer
})

let initalState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const middleware = [thunk];
const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
