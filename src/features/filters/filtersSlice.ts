import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../products/productSlice";

export interface SortOption {
    name: string;
    value: string | undefined;
}

interface Filters {
    products: Product[],
    filtered_products: Product[],
    page: number,
    display: 'grid'| 'list',
    sort: SortOption,
    filters: {
        max_price: number,
        min_price: number,
        price: number,
        rating: number | null,
    }
}

const initialState = {
    products: [],
    filtered_products: [],
    page: 1,
    display: 'grid',
    sort: {name:'Default Sorting', value: 'default'},
    filters: {
        max_price: 0,
        min_price: 0,
        price: 0,
        rating: null,
    }
} as Filters

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        loadProducts: (state, { payload }) => {
            state.filtered_products = payload
            state.products = payload
            state.filters.max_price = Math.max(...payload.map((product: Product) => product.price))
            state.filters.min_price = Math.min(...payload.map((product: Product) => product.price))
            state.filters.price = Math.max(...payload.map((product: Product) => product.price))
        },
        setPage: (state, { payload }) => {
            state.page = payload
        },
        setDisplay: (state, { payload }) => {
            state.display = payload
        },
        setSortType: (state, { payload }) => {
            state.sort = payload
        },
        setFilterPrice: (state, { payload }) => {
            state.filters.price = payload
        },
        sortProducts: (state) => {
            let temp_products = [...state.filtered_products]
            switch (state.sort.value) {
                case 'rating':
                    temp_products.sort((a, b) => b.rate - a.rate)
                    break;
                case 'price-des':
                    temp_products.sort((a, b) => b.price - a.price)
                    break;
                case 'price-inc':
                    temp_products.sort((a, b) => a.price - b.price)
                    break;
                case 'a-z':
                    temp_products.sort((a, b) => a.name.localeCompare(b.name))
                    break;
                case 'z-a':
                    temp_products.sort((a, b) => b.name.localeCompare(a.name))
                    break;
                case 'default':
                    temp_products = [...state.filtered_products]
            }
            state.filtered_products = [...temp_products]
        },
        filterProducts: (state) => {
            let temp_products = [...state.products]
            temp_products = temp_products.filter(product => product.price <= state.filters.price)
            state.filtered_products = [...temp_products]
        },
        clearFilters: (state) => {
            state.filters.price = state.filters.max_price
        }
    }
})

export const {  
    loadProducts,
    setDisplay, 
    setPage, 
    setSortType,
    setFilterPrice, 
    sortProducts,
    filterProducts,
    clearFilters,
} = filtersSlice.actions
export default filtersSlice.reducer