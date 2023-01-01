import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product, Pagination } from "./productSlice";

const baseUrl = process.env.REACT_APP_BASE_URL

export const getFeaturedProducts = createAsyncThunk('products/getFeaturedProducts', async(quantity: number, thunkAPI) => {
    try {
        const urlParams = `best-foods?_sort=rate&_order=desc&_limit=${quantity}`
        const { data } = await axios.get<Product[]>(`${baseUrl}${urlParams}`)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}) 

export const getBurgers = createAsyncThunk('products/getBurgers', async(quantity: number, thunkAPI) => {
    try {
        const urlParams = `burgers?_sort=rate&_order=desc&_limit=${quantity}`
        const { data } = await axios.get<Product[]>(`${baseUrl}${urlParams}`)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const getProducts = createAsyncThunk('products/getProducts', async(foodType : string, thunkAPI) => {
    try {
        const urlParams = `${foodType}`
        const { data } = await axios.get<Product[]>(`${baseUrl}${urlParams}`)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getPagination = createAsyncThunk('products/getPagination', async(props, thunkAPI) => {
    try {
        const urlParams = 'pagination'
        const { data } = await axios.get<Pagination>(`${baseUrl}${urlParams}`)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})