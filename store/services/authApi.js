import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // tumhare Next.js API routes ka base path
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",   // ye call karega /api/auth/login
        method: "POST",
        body: credentials,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "auth/verify-otp", // ye call karega /api/auth/verify-otp
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useVerifyOtpMutation } = authApi;
