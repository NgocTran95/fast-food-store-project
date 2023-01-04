import { createSlice } from "@reduxjs/toolkit";
import { createReview, getSingleProduct, getRelatedProducts } from "./services";
import { ReviewData } from "../../pages/SingleProductPage/Reviews/Reviews";
import { Product } from "../products/productSlice";
interface reviewState {
    isLoading: boolean;
    single_product: Product;
    related_products: Product[];
    reviews: ReviewData[];
    isSuccess: boolean;
    isSentReviewSuccess: boolean;
    error: any;
}

const initialState = {
    isLoading: false,
    single_product: { id: '', img: '', country: '', dsc: '', name: '', price: 0, rate: 0},
    reviews: [],
    related_products: [],
    isSuccess: false,
    isSentReviewSuccess: false,
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
        .addCase(getSingleProduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getSingleProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.single_product = action.payload;
        })
        .addCase(getSingleProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
        .addCase(createReview.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createReview.fulfilled, (state) => {
            state.isLoading = false;
            state.isSentReviewSuccess = true
        })
        .addCase(createReview.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
                
        .addCase(getRelatedProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getRelatedProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.related_products = action.payload;
        })
        .addCase(getRelatedProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
    }
})
export const { setReviews } = reviewSlice.actions
export default reviewSlice.reducer