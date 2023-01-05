import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../products/productSlice";

export interface WishListData {
    id: string;
    uid: string;
    wishlist: Product[];
}

interface WishList extends WishListData {
    isOpenWishListModal: boolean;
}

const initialState = {
    id: '',
    uid: '',
    wishlist: [],
    isOpenWishListModal: false
} as WishList

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setShowWishList: (state, { payload }: {payload : boolean}) => {
            state.isOpenWishListModal = payload
        },
        setWishList: (state, { payload }: {payload: WishListData }) => {
            state.id = payload.id;
            state.uid = payload.uid;
            state.wishlist = [...payload.wishlist];
        },
        addToWishList: (state, { payload }: { payload: Product}) => {
            state.wishlist.push(payload)
        },
        removeFromWishList: (state, { payload }: { payload: string}) => {
            state.wishlist = state.wishlist.filter(item => item.id !== payload)
        }
    }
})

export const { setShowWishList, setWishList, addToWishList, removeFromWishList } = wishlistSlice.actions
export default wishlistSlice.reducer