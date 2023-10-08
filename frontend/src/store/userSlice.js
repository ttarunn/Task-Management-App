import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        online:false,
        userData:null
    },
    reducers: {
        login: (state, action) => void(
            state.online = true,
            state.userData = action.payload
        ),
        logout: (state, action) => void(
            state.online = false,
            state.userData = null
        ),
        addToken: (state, action) => void(
            state.token = action.payload
        ),

    }
});

export const { login, logout, addToken } = userSlice.actions;

export default userSlice.reducer;