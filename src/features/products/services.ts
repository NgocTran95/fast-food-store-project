import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "./productSlice";

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

export const getBurgerList = createAsyncThunk('products/getBurgerList', async(quantity: number, thunkAPI) => {
    try {
        const urlParams = `burgers?_sort=rate&_order=desc&_limit=${quantity}`
        const { data } = await axios.get<Product[]>(`${baseUrl}${urlParams}`)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})