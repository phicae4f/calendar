import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"
import eventReducer from "./event/eventSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        event: eventReducer
    }
})

export type RootState = ReturnType<typeof store.getState> //тип знает о reducers и о данных, с которыми они работают
export type AppDispatch = typeof store.dispatch