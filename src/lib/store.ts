import { Column } from "@/components/board/board-column";
import { UniqueIdentifier } from "@dnd-kit/core";
import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Status = "TODO" | "IN_PROGRESS" | "DONE";

const defaultCols = [
  {
    id: "TODO" as const,
    title: "Todo",
  },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]["id"];

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
};

export type State = {
  tasks: Task[];
  columns: Column[];
  draggedTask: string | null;
};

export type Actions = {
  addTask: (title: string, description?: string) => void;
  addCol: (title: string) => void;
  dragTask: (id: string | null) => void;
  removeTask: (title: string) => void;
  removeCol: (id: UniqueIdentifier) => void;
  setTasks: (updatedTask: Task[]) => void;
  setCols: (cols: Column[]) => void;
  updateCol: (id: UniqueIdentifier, newName: string) => void;
};

export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: [],
      columns: defaultCols,
      draggedTask: null,
      addTask: async (title: string, description?: string) => {
        try {
          const id = uuid();

          await fetch(`/api/tasks`, {
            method: "POST",
            body: JSON.stringify({ id, title }),
            credentials: "same-origin",
          });

          set((state) => ({
            tasks: [
              ...state.tasks,
              { id: id, title, description, status: "TODO" },
            ],
          }));
        } catch (e) {}
      },
      updateCol: (id: UniqueIdentifier, newName: string) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === id ? { ...col, title: newName } : col
          ),
        })),
      addCol: async (title: string) => {
        try {
          const newCol = { id: uuid(), title };
          await fetch(`/api/column`, {
            method: "POST",
            body: JSON.stringify({ ...newCol }),
            credentials: "same-origin",
          });
          set((state) => ({
            columns: [...state.columns, newCol],
          }));
        } catch (e) {
          console.log(e);
        }
      },
      dragTask: (id: string | null) => set({ draggedTask: id }),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      removeCol: async (id: UniqueIdentifier) => {
        try {
          await fetch(`/api/column`, {
            method: "DELETE",
            body: JSON.stringify({ id }),
            credentials: "same-origin",
          });
          set((state) => ({
            columns: state.columns.filter((col) => col.id !== id),
          }));
        } catch (e) {
          console.log(e);
        }
      },
      setTasks: async (newTasks: Task[]) => {
        try {
          await fetch(`/api/tasks`, {
            method: "POST",
            body: JSON.stringify({ tasks: newTasks }),
            credentials: "same-origin",
          });
          set({ tasks: newTasks });
        } catch (e) {
          console.log(e);
        }
      },
      setCols: async (newCols: Column[]) => {
        try {
          await fetch(`/api/column`, {
            method: "POST",
            body: JSON.stringify({ columns: newCols }),
            credentials: "same-origin",
          });
          set({ columns: newCols });
        } catch (e) {
          console.log(e);
        }
      },
    }),
    { name: "task-store", skipHydration: true }
  )
);
