import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
// เนื่องจากเป็นค่า default เลยไม่จำเป็นต้องใช้ {}
import  cartSliceReducer  from "./slices/cartSlice.js";


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
}); 

export default store ;