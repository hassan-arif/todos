import { create } from 'zustand';

export const useTodo = create((set) => ({
  todos: [],
}));