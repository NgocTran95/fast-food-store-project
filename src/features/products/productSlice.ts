import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getFeaturedProducts } from "./services";

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
    isSuccess: boolean;
    error: any;
}

const initialState = {
    isLoading: false,
    featuredProducts: [],
    isSuccess: false,
    error: {},
} as Products

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(getFeaturedProducts.pending, (state, action) => {
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
    },
})



export default productSlice.reducer