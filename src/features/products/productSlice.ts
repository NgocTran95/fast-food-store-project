import { createSlice } from "@reduxjs/toolkit";
import { getFeaturedProducts, getBurgerList } from "./services";

export interface Product {
    id: string;
    img: string;
    name: string;
    dsc: string;
    price: number;
    rate: number;
    country: string;
}

export interface Products {
    isLoading: boolean;
    featuredProducts: Product[];
    burgerList: Product[];
    isSuccess: boolean;
    error: any;
}

const initialState = {
    isLoading: false,
    featuredProducts: [],
    burgerList: [],
    isSuccess: false,
    error: {},
} as Products

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(getFeaturedProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getFeaturedProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.featuredProducts = action.payload;
        })
        .addCase(getFeaturedProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
        .addCase(getBurgerList.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getBurgerList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.burgerList = action.payload;
        })
        .addCase(getBurgerList.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
    },
})



export default productSlice.reducer