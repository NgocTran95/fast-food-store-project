import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

export interface userInput {
    email: string,
    username: string,
    password: string,
}

export const registerUser = createAsyncThunk('user/register', async({ email, username, password }: userInput, thunkAPI) =>  {
    try {
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            addDoc(collection(db, 'users'), {
                uid: userCredential.user.uid,
                providerId: userCredential.providerId,
                displayName: username,
                email,
                password,
                createAt: serverTimestamp()
            })
        }).catch((error) => {
            return thunkAPI.rejectWithValue(error)
        })     
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error)
    }
})