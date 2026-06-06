import { create } from "zustand";
import type { Filter, TodoItem } from "./types";

type TodoState = {
  todos: TodoItem[];
  filter: Filter;
  inputValue: string;
  addTodo: () => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, label: string) => void;
  setFilter: (filter: Filter) => void;
  setInputValue: (value: string) => void;
};

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  filter: "all",
  inputValue: "",
  addTodo: () => {
    const trimmed = get().inputValue.trim();
    if (!trimmed) return;
    set((state) => ({
      todos: [...state.todos, { id: crypto.randomUUID(), label: trimmed, completed: false }],
      inputValue: "",
    }));
  },
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
  editTodo: (id, label) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? { ...t, label } : t)),
    })),
  setFilter: (filter) => set({ filter }),
  setInputValue: (value) => set({ inputValue: value }),
}));
