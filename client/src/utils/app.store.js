import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import ownerReducer from "./sellerSlice"
const appStore = configureStore({
    reducer: {
        user: userReducer,
        owner: ownerReducer
    }
})

export default appStore;