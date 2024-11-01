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
    { id: '11', text: 'Buy salt'},
    { id: '12', text: 'Buy pepper'},
    { id: '13', text: 'Buy oil'},
    { id: '14', text: 'Buy vinegar'},
    { id: '15', text: 'Buy mustard'},
    { id: '16', text: 'Buy ketchup'},
    { id: '17', text: 'Buy mayonnaise'},
    { id: '18', text: 'Buy soy sauce'},
    { id: '19', text: 'Buy Worcestershire sauce'},
    { id: '20', text: 'Buy Tabasco sauce'},
  ],
  delete: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
}));