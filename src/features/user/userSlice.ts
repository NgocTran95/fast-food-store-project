import { createSlice } from '@reduxjs/toolkit';
import { registerUser, logInByEmail, logInWithPopup, logOut } from './services';

export interface userInfo {
    email: string;
    displayName: string;
    photoURL?: string;
    uid: string;
}

export interface userState {
    isLoading: boolean;
    userInfo: userInfo;
    isSuccess: boolean;
    error: {code: string};
}
const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
const initialState = {
    isLoading: false,
    userInfo: currentUser,
    isSuccess: false,
    error: {},
} as userState

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.userInfo = {...payload}
        },
        resetSuccessStatus: (state) => {
            state.isSuccess = false
        }
    },
    extraReducers: {
        [registerUser.pending.type]: (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [registerUser.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload
        },
        [logInByEmail.pending.type]: (state) => {
            state.isLoading = true
        },
        [logInByEmail.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [logInByEmail.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload
        },
        [logInWithPopup.pending.type]: (state) => {
            state.isLoading = true
        },
        [logInWithPopup.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [logInWithPopup.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload
        },
        [logOut.pending.type]: (state) => {
            state.isLoading = true
        },
        [logOut.fulfilled.type]: (state) => {
            state.isLoading = false
            state.userInfo = {email: '', displayName: '', uid: '', photoURL: ''}
        },
        [logOut.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload
        },
    }
})

export const { setUser, resetSuccessStatus } = userSlice.actions
export default userSlice.reducer