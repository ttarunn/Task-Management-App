import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        online:false,
        token:null
    },
    reducers: {
        login: (state, action) => void(
            state.online = true,
            state.token = action.payload
        ),
        logout: (state, action) => void(
            state.online = false,
            state.token = null
        )
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;