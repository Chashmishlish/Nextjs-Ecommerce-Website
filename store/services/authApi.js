import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create an API slice using RTK Query for authentication
export const authApi = createApi({
  reducerPath: "authApi",  // The key for this slice in the Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", //  Next.js API routes ka base path
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",   // ye call karega /api/auth/login
        method: "POST",
        body: credentials,
      }),
    }),
    