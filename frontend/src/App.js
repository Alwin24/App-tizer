import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/Home'
import DishDetails from './components/dish/DishDetails'

import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'

import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'

import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'
import ListOrders from './components/order/ListOrders'

import store from './store'
import axios from 'axios'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderDetails from './components/order/OrderDetails'

import Dashboard from './components/admin/Dashboard'
import DishesList from './components/admin/DishesList'
import NewDish from './components/admin/NewDish'
import UpdateDish from './components/admin/UpdateDish'
import OrdersList from './components/admin/OrdersList'
import ProcessOrder from './components/admin/ProcessOrder'
import UsersList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'
import DishReviews from './components/admin/DishReviews'

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('')

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey();

  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/dish/:id" component={DishDetails} exact />

          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/shipping" component={Shipping} exact />
          <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
          <ProtectedRoute path="/success" component={OrderSuccess} exact />
          {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          }

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute path="/password/update" component={UpdatePassword} exact />

          <ProtectedRoute path="/orders/me" component={ListOrders} exact />
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />

        </div>

        <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
        <ProtectedRoute path="/admin/dishes" isAdmin={true} component={DishesList} exact />
        <ProtectedRoute path="/admin/dish" isAdmin={true} component={NewDish} exact />
        <ProtectedRoute path="/admin/dish/:id" isAdmin={true} component={UpdateDish} exact />

        <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />
        <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />

        <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
        <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />

        <ProtectedRoute path="/admin/reviews" isAdmin={true} component={DishReviews} exact />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
