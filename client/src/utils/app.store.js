import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import ownerReducer from "./sellerSlice"
import cartReducer from "./cartSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        owner: ownerReducer,
        cart: cartReducer
    }
})

export default appStore;