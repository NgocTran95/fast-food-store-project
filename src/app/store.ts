import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import productReducer from '../features/products/productSlice';
import filterReducer from '../features/filters/filtersSlice';
import singleProductReducer from '../features/single_product/singleProductSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    filters: filterReducer,
    single_product: singleProductReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
