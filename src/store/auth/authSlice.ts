import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, NullableUser } from "../../models/IUSer";

interface AuthState {
  isAuthenticated: boolean;
  error: string;
  isLoading: boolean;
  token: string | null;
  user: NullableUser;
}

const loadAuthState = (): Partial<AuthState> => {
    try {
        const token = localStorage.getItem("auth")
        const user = localStorage.getItem("user")
        return {
            isAuthenticated: !!token,
            error: "",
            isLoading: false,
            token: token || null,
            user: user ? JSON.parse(user) : null,
        }
    } catch (error) {
        return {
            isAuthenticated: false,
            error: "",
            isLoading: false,
            token: null,
            user: null,
        }
    }
}


const initialState: AuthState = {
      isAuthenticated: false,
      error: "",
      isLoading: false,
      token: null,
      user: null,
      ...loadAuthState()
  };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{user: IUser, token: string}>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token
      localStorage.setItem("auth", action.payload.token)
      localStorage.setItem("user", JSON.stringify(action.payload.user))
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth")
      localStorage.removeItem("user")
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    initializeAuth: (state) => {
        const savedState = loadAuthState()
        if(savedState.token) {
            state.isAuthenticated = savedState.isAuthenticated ?? false
            state.token = savedState.token ?? null
            state.user = savedState.user?? null
        }
    }
  },
});



export const { login, logout, setLoading, setError, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
