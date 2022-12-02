import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import ProductDetails from '../pages/ProductDetails';
import Shop from '../pages/Shop';
import Signup from '../pages/Signup';

const Router = () => {
  return (
        <Routes>
            <Route index exact path='/' element={ <Navigate to='/home' />} />
            <Route index exact path='home' element={ <Home />} />
            <Route path='/shop' element={ <Shop />} />
            <Route path='/shop/:id' element={ <ProductDetails />} />
            <Route path='/cart' element={ <Cart />} />
            <Route path='/login' element={ <Login />} />
            <Route path='/signup' element={ <Signup />} />
            <Route path='/checkout' element={ <Checkout />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
  )
}

export default Router