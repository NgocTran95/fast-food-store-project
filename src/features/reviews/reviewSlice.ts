import { createSlice } from "@reduxjs/toolkit";
import { createReview } from "./services";
import { ReviewData } from "../../pages/SingleProductPage/Reviews/Reviews";

interface reviewState {
    isLoading: boolean;
    reviews: ReviewData[];
    isSuccess: boolean;
    error: any;
}

const initialState = {
    isLoading: false,
    reviews: [],
    isSuccess: false,
    error: {},
} as reviewState

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        setReviews: (state, { payload }) => {
            state.reviews = payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createReview.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createReview.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true
        })
        .addCase(createReview.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
    }
})
export const { setReviews } = reviewSlice.actions
export default reviewSlice.reducer