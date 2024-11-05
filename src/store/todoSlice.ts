import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const todoClient = axios.create({
  baseURL: process.env.API_URL + '/todos'
})

export const getTodos = createAsyncThunk('getUsers', async () => {
    return await todoClient.get('/')
      .then(response => response.data)
      .catch((error) => {
        console.log(error)
      })
});

export const deleteTodos = createAsyncThunk("deleteTodos", async (id) => {
  return await todoClient.delete(`/${id}`)
    .then(response => response.data)
    .catch((error) => {
      console.log(error)
    })
});

export const createTodos = createAsyncThunk("createTodos", async (props) => {
  const {userId, title, completed } = props
  
  return await todoClient.post('/', { userId, title, completed })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })
});

const initialState: {
  todoList: any[],
  size: number,
  loading: boolean,
  error: string | undefined
} = {
  todoList: [],
  size: 1,
  loading: false,
  error: undefined
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false
        state.todoList = action.payload
        state.error = ''
        state.size = state.todoList.length + 1
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false
        state.todoList = []
        state.size = 1
        state.error = action.error.message
      })
      .addCase(deleteTodos.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''

        let index = state.todoList.findIndex((todo => todo.id === action.meta.arg))
        state.todoList.splice(index, 1)
      })
      .addCase(deleteTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createTodos.pending, (state) => {
        state.loading = true
      })
      .addCase(createTodos.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''

        const {userId, title, completed} = action.payload
        state.todoList.push({
          userId, title, completed, id: state.size
        })
        
        state.size += 1
      })
      .addCase(createTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
});

export default todoSlice.reducer;