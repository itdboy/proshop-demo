import { createSlice } from "@reduxjs/toolkit";


// ตรวจเช็คถ้า cookie เก็บค่า cart ก็ให้ดึงจาก cookie แต่ถ้าไม่มีให้คืนเป็น array ว่าง
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

// ฟังก์ชันหาเปอร์เซนต 
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      //calculate item price
      state.itemPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      //calculate shipping price (if order is over 100 then free, else 10 shipping)
      state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

      //calculate tax price (15% price)
      state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));

      //calculate total price
      state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
