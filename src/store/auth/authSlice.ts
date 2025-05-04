import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, NullableUser } from "../../models/IUSer";

interface AuthState {
    isAuthenticated: boolean,
    error: string,
    isLoading: boolean,
    user: NullableUser
}

const initialState: AuthState = {
    isAuthenticated: false,
    error: "",
    isLoading: false,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})

export const {login, logout, setLoading, setError} = authSlice.actions
export default authSlice.reducer