import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import productReducer from '../features/products/productSlice';
import filterReducer from '../features/filters/filtersSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    filters: filterReducer,
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
