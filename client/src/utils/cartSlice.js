import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice(
    {
        name: 'cart',
        initialState: {
            orders: []
        },
        reducers: {
            addItem: (state, action) => {
                state.orders.push(action.payload)
            },
            removeItem: (state, action) => {
                state.orders.pop();
            },
            clearCart: (state, action) => {
                state.orders.length = 0;
            }
        }
    }
)

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;