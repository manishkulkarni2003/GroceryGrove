import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    //this is one before change
    name: "cart",
    initialState: {
        orders: [],
    },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.orders.find(
                (item) => item._id === action.payload._id
            );
            if (existingItem) {
                existingItem.quantity += 1; // Increment quantity if item already exists
            } else {
                state.orders.push({ ...action.payload, quantity: 1 }); // Add item with initial quantity 1
            }
        },
        removeItem: (state, action) => {
            const itemIndex = state.orders.findIndex(
                (item) => item._id === action.payload._id
            );
            if (itemIndex !== -1) {
                const item = state.orders[itemIndex];
                if (item.quantity > 1) {
                    item.quantity -= 1; // Decrement quantity
                } else {
                    state.orders.splice(itemIndex, 1); // Remove item if quantity reaches 0
                }
            }
        },
        clearCart: (state) => {
            state.orders = []; // Clear all items in the cart
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
