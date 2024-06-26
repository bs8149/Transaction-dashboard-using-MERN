import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./redux/productApi";

const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: (getDefautMiddleware) => 
        getDefautMiddleware().concat(productApi.middleware)
})

export default store