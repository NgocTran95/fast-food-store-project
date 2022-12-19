import { createSlice } from '@reduxjs/toolkit';
import { FieldValue } from 'firebase/firestore';
import { registerUser, userInput } from './userAction';

type userInfoType = userInput & {
    uid: string
    providerId: string | null;
    createAt: FieldValue | null;
}


export interface userRegister {
    isLoading: boolean;
    userInfo: userInfoType;
    isSuccess: boolean;
    error: object;
}
const initialState = {
    isLoading: false,
    userInfo: {},
    isSuccess: false,
    error: {},
} as userRegister

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [registerUser.pending.type]: (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled.type]: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.userInfo = payload
        },
        [registerUser.rejected.type]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload
        },
    }
})

export default userSlice.reducer