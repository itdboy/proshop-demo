import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cardUtils";

// ตรวจเช็คถ้า cookie ถ้ามี localStorage ชื่อ cart ก็ให้ดึง localStorage ขื่อ cart ออกมา
// แต่ถ้าไม่มีให้สร้าง cartItem array, shippingAddress, paymentMethod (default เป็น Paypal)
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //state = ตัวแปรในที่นี้คือ card
    //action =  เป็นวิธีที่จะให้ทำงาน เช่น addToCart, removeFromCart
    addToCart: (state, action) => {
      //อ่านค่า action เก็บไว้ใน item
      const item = action.payload;

      // ตรวจเช็คตัวแปร item ว่ามีอยู่ใน state แล้วหรือยัง
      // state.cartItems.find คือการเช็คว่า state ที่ส่งมานั้น ( x แทน current item)
      // เมือ่ x หาตัวแปรได้ก็ให้ส่งมาที่ ตัวแปร existItem

      // เป็นการ หาตัวแปร item ที่มีอยู่โดย หาทีล่ะตัวแปร x ถ้า x._id เท่ากับ ตัวแปร item (action.payload) ._id ก็คืนค่าให้กับ existItem
      const existItem = state.cartItems.find((x) => x._id === item._id);

      // ถ้าตัวแปร existItem อยู่ state อยู่แล้ว
      if (existItem) {
        //ทำการ map ถ้า existItem มีอยู่ใน state ให้ return group ของ existItem
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        //กรณีถ้าไม่มีใน state ให้เพิ่ม  new item ใน cartItems
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },

    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

//เวลาที่ export จะใช้ชื่อตรงๆ เลยไม่เหมือนกับ usersApiSlice เนื่องจากไม่มีการใช้ createApi
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
