import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState = {
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action?: PayloadAction) => {
            state.isAuthenticated = true
        },
        logout: (state, action?: PayloadAction) => {
            state.isAuthenticated = false
        }
    }

})


export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
