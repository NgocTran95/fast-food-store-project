import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../products/productSlice";

interface CartItem {
    product_info: Product;
    quantity: number;
}

export interface CartData {
    uid: string;
    cart: CartItem[];
    total_items: number;
    total_amount: number;
    wishlist: string[];
}

interface CartType extends CartData {
    id: string;
    isOpenCartModal: boolean;
    add_cart_product: Product;
    isShowCart: boolean;
    discount: number;
}

const initialState = {
    id: '', 
    uid: '',
    cart: [],
    total_items: 0,
    total_amount: 0,
    wishlist: [],
    isOpenCartModal: false,
    add_cart_product: { id: '', img: '', country: '', dsc: '', name: '', price: 0, rate: 0},
    isShowCart: false,
    discount: 0.1,
} as CartType

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, { payload }) => {
            state.id = payload.id
            state.uid = payload.uid;
            state.cart = [...payload.cart];
            state.total_items = payload.total_items;
            state.total_amount = payload.total_amount;
            state.wishlist = [...payload.wishlist];
        },
        setShowCartModal: (state, { payload } : { payload: 'close'|'open'}) => {
            if (payload === 'open') {
                state.isOpenCartModal = true
            } else {
                state.isOpenCartModal = false
            }
        },
        setShowCart: (state, { payload }: {payload : boolean}) => {
            state.isShowCart = payload
        }, 
        setAddToCartProduct: (state, { payload }: { payload: Product }) => {
            state.add_cart_product = {...payload}
        },
        addToCart: (state, { payload }: { payload: CartItem}) => {
            const { product_info, quantity} = payload
            const existedProduct = state.cart.find(product => product.product_info.id === product_info.id)
            let tempCart = [...state.cart]
            if (existedProduct) {
                const index = state.cart.indexOf(existedProduct)
                const newQuantity = existedProduct.quantity + quantity
                tempCart.splice(index, 1, { product_info, quantity: newQuantity})
            } else {
                tempCart = [...tempCart, payload]
            }
            state.cart = [...tempCart]
        },
        removeFromCart: (state, { payload }) => {
            state.cart = state.cart.filter(item => item.product_info.id !== payload)
        },
        toggleAmountCartItem: (state, { payload } : { payload: { id: string, amount: number}}) => {
            const { id, amount } = payload
            let tempCart = [...state.cart]
            const toggleAmountItem = tempCart.find(item => item.product_info.id === id)
            if (toggleAmountItem) { 
                const index = tempCart.indexOf(toggleAmountItem)
                tempCart.splice(index, 1, { product_info: toggleAmountItem.product_info, quantity: amount })
            }
            state.cart = [...tempCart]
        },
        calculateTotals: (state) => {
            state.total_items = state.cart.reduce((total, item) => total += item.quantity, 0)
            state.total_amount = state.cart.reduce((total, item) => total += item.product_info.price*item.quantity, 0)
        },
    },
})

export const { 
    setCart,
    setShowCartModal,
    setShowCart,
    setAddToCartProduct,
    addToCart,
    removeFromCart,
    calculateTotals,
    toggleAmountCartItem
} = cartSlice.actions
export default cartSlice.reducer