import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading: false,
        user: null,
        isAuthenticated: false,
        error: null,
        token: null
    },
    reducers:{
        //actions
        setLoading:(state,action) => {
           state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            state.error = null;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const {setLoading, setUser, setError, setToken, logout, clearError} = authSlice.actions;
export default authSlice.reducer;