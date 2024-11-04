import { create } from 'zustand';
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

export const useTodo = create((set) => ({
  todos: [
    { id: '1', text: 'Buy milk', done: true },
    { id: '2', text: 'Buy eggs', done: true },
    { id: '3', text: 'Buy bread', done: true },
    { id: '4', text: 'Buy butter', done: true },
    { id: '5', text: 'Buy cheese', done: true },
    { id: '6', text: 'Buy jam', done: true },
    { id: '7', text: 'Buy honey', done: true },
    { id: '8', text: 'Buy tea', done: true },
    { id: '9', text: 'Buy coffee', done: true },
    { id: '10', text: 'Buy sugar', done: true },
    { id: '11', text: 'Buy salt', done: true },
    { id: '12', text: 'Buy pepper', done: true },
    { id: '13', text: 'Buy oil', done: true },
    { id: '14', text: 'Buy vinegar', done: true },
    { id: '15', text: 'Buy mustard', done: true },
    { id: '16', text: 'Buy ketchup', done: true },
    { id: '17', text: 'Buy mayonnaise', done: true },
    { id: '18', text: 'Buy soy sauce', done: true },
    { id: '19', text: 'Buy Worcestershire sauce', done: true },
    { id: '20', text: 'Buy Tabasco sauce', done: true },
  ],
  delete: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  add: (text) => set((state) => ({
    todos: [...state.todos, { id: uuidv4(), text }],
  })),
}));