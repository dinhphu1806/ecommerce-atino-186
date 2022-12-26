import { configureStore } from "@reduxjs/toolkit"; // setting npm install @reduxjs/toolkit

import CartSlide from "./slices/CartSlide"; //3 từ file store.js

// save configStore to store
const store = configureStore({
    reducer: {
        cart: CartSlide,   //4. ttheem  xong sang file productCarrd import
    },
});

export default store;

// sang file index.js import store kết nối bằng provider
// import { Provider }

