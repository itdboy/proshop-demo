import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// productsApiSlice เป็น child ของ apiSlice
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});


//เวลาที่ export จะไม่เหมื่อนกับ cartSlice เพราะเราใช้ createApi (มาจาก apiSlice)
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  usersApiSlice;
