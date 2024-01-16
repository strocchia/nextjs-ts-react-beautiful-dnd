import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import { Status, Todo } from "./todoTypes";

type State = {
  todos: Todo[];
  activeTask: Todo | null;
};

export type Actions = {
  addNewOne: (title: string) => void;
  onDrag: (id: string) => void;
  updateTitle: (id: string, title: string) => void;
  updateStatus: (id: string, status: Status) => void;
  updateCompleted: (id: string) => void;
  removeOne: (id: string) => void;
};

export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      todos: [],
      activeTask: null,
      addNewOne: (title: string) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { id: uuid(), title, status: "TODO", completed: false },
          ],
        })),
      onDrag: (id: string) =>
        set((state) => ({
          activeTask: state.todos.find((t) => t.id === id) ?? null,
        })),
      updateTitle: (id: string, title: string) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? { ...t, title } : t)),
        })),
      updateStatus: (id: string, status: Status) =>
        set((state) => ({
          todos: state.todos.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        })),
      updateCompleted: (id: string) =>
        set((state) => ({
          todos: state.todos.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      removeOne: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((task) => task.id !== id),
        }));
      },
    }),
    { name: "taskify-this", skipHydration: true }
  )
);
