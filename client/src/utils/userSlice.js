import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,  // Changed from { user: null } to null directly
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: () => {
            return null;  // Always return null to reset state
        }
    }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;