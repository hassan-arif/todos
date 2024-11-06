import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlice';
import { todoApi } from "./todoApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware),
});
setupListeners(store.dispatch);