import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import { dishesReducer, dishDetailsReducer } from './reducers/dishReducers';
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
    dishes: dishesReducer,
    dishDetails: dishDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer
})

let initalState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        // shippingInfo: localStorage.getItem('shippingInfo')
        //     ? JSON.parse(localStorage.getItem('shippingInfo'))
        //     : {}
    }
}

const middleware = [thunk, logger];
const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
