import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL + '/todos' }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/',
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
    }),
  }),
})
export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation } = todoApi;