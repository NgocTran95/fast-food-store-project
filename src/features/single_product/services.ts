import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Product } from "../products/productSlice";

const baseUrl = process.env.REACT_APP_BASE_URL


interface SingleProductParams {
    id: string | undefined,
    category: string | undefined,
}

export const getSingleProduct = createAsyncThunk('products/getSingleProduct', async({ id, category }: SingleProductParams, thunkAPI) => {
    try {
        const urlParams = `${category}?id=${id}`
        const { data } = await axios.get<Product[]>(`${baseUrl}${urlParams}`)
        return data[0]
    } catch (error) {
        return thunkAPI.rejectWithValue(error) 
    }
})

export interface Review {
    uid: string;
    name: string;
    email: string;
    comment: string;
    rating: number;
}

export const createReview = createAsyncThunk('reviews/createReview', async (data: Review, thunkAPI) => {
    const { uid, name, email, comment, rating } = data
    try {
        await addDoc(collection(db, 'reviews'), {
            uid,
            name,
            email,
            comment,
            rating,
            createAt: serverTimestamp(),
        })
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getRelatedProducts = createAsyncThunk('products/getRelatedProducts', async(foodType : string, thunkAPI) => {
    try {
        const urlParams = `${foodType}?_sort=rate&_order=desc&_limit=20`
        const { data } = await axios.get<Product[]>(`${baseUrl}${urlParams}`)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

 