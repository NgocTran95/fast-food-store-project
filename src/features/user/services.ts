import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdditionalUserInfo, createUserWithEmailAndPassword, FacebookAuthProvider, getAdditionalUserInfo, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/config";


interface userRegisterInput {
    email: string,
    username: string,
    password: string,
}

interface userLoginByEmail {
    email: string,
    password: string
}

export const registerUser = createAsyncThunk('user/register', async({ email, username, password }: userRegisterInput, thunkAPI) =>  {
    try {
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            addDoc(collection(db, 'users'), {
                uid: userCredential.user.uid,
                email,
                password,
                displayName: username,
                providerId: userCredential.providerId,
                createAt: serverTimestamp()
            })
        })
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const logInByEmail = createAsyncThunk('user/loginByEmail', async({email, password} : userLoginByEmail, thunkAPI) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)    
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const logInWithPopup = createAsyncThunk('user/logInWithPopup', async(provider : FacebookAuthProvider | GoogleAuthProvider, thunkAPI) => {
    try {
        const userCredential = await signInWithPopup(auth, provider)
        const additionalUserInfo : AdditionalUserInfo | null = getAdditionalUserInfo(userCredential)
        const { user, providerId } = userCredential
        if (additionalUserInfo?.isNewUser) {
            addDoc(collection(db, 'users'), {
                uid: user.uid,
                email: user.email,
                photoURL: user.photoURL,
                displayName: user.displayName,
                providerId,
                createAt: serverTimestamp()
            })
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

// eslint-disable-next-line
export const logOut = createAsyncThunk('user/logout', async() => {
    try {
        await auth.signOut().then(() => {
            localStorage.removeItem('user')
        })   
    } catch (error) {
        return error
    }
})