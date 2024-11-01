import { create } from 'zustand';

export const useTodo = create((set) => ({
  todos: [
    { id: '1', text: 'Buy milk'},
    { id: '2', text: 'Buy eggs'},
    { id: '3', text: 'Buy bread'},
    { id: '4', text: 'Buy butter'},
    { id: '5', text: 'Buy cheese'},
    { id: '6', text: 'Buy jam'},
    { id: '7', text: 'Buy honey'},
    { id: '8', text: 'Buy tea'},
    { id: '9', text: 'Buy coffee'},
    { id: '10', text: 'Buy sugar'},
  ],
}));