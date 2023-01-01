import { createSlice } from "@reduxjs/toolkit";
import { getFeaturedProducts, getBurgers, getProducts, getPagination } from "./services";

export interface Product {
    id: string;
    img: string;
    name: string;
    dsc: string;
    price: number;
    rate: number;
    country: string;
}

export interface Pagination {
    [key: string]: number
}

export interface Products {
    isLoading: boolean;
    featured_products: Product[];
    burgers: Product[];
    products: Product[];
    pagination: Pagination;
    isSuccess: boolean;
    error: any;
}

const initialState = {
    isLoading: false,
    featured_products: [],
    burgers: [],
    products: [],
    pagination: JSON.parse(localStorage.getItem('pagination') || '{}'),
    isSuccess: false,
    error: {},
} as Products

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
        .addCase(getFeaturedProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getFeaturedProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.featured_products = action.payload;
        })
        .addCase(getFeaturedProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
        .addCase(getBurgers.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getBurgers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.burgers = action.payload;
        })
        .addCase(getBurgers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
        .addCase(getProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
        .addCase(getPagination.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getPagination.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.pagination = action.payload;
        })
        .addCase(getPagination.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
    },
})

export default productSlice.reducer