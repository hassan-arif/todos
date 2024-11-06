import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL + '/todos' }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/',
    })
  }),
})
export const { useGetTodosQuery } = todoApi;