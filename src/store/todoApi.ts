import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  /**
   * todoApi is an API created using createApi from @reduxjs/toolkit/query/react.
   * It has the following endpoints: getTodos, addTodo, updateTodo, and deleteTodo.
   * @returns {void}
   */
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.LOCAL_API_URL }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/todos',
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: '/todos',
        method: 'POST',
        body: data
      }),
    }),
    updateTodo: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/todos/${id}`,
          method: 'PATCH',
          body: body
        }
      },
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE'
      }),
    }),
  }),
})
export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } = todoApi;