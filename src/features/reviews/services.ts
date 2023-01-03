import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

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

 