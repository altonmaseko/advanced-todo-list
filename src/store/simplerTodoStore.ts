
// This is not a hiararchical approach. Hiararchical approach better for large apps and speed.
// This method requires alot of filtering.

import { create } from "zustand";

type TodoType = {
  id: number,
  text: string,
  completed: boolean,
  listId: number,
  workSpaceID: number,
}

type AllTodosType = { // just stores ALL todos, with their ids
  todos: TodoType[],
  addTodo: (todo: TodoType) => void,
  removeTodo: (todoId: number) => void,

  removeTodos: (listId: number, workSpaceId: number) => void
}

type ListType = {
  id: number,
  name: string
}

type AllListsType = { // stores all lists along with their listId's
  lists: ListType[],
  addList: (list: ListType) => void,
  removeList: (id: number) => void,
}

type WorkSpaceType = {
  id: number,
  name: string
}

type ALlWorkSpacesType = { // stores all workspaces along with their workSpaceId's
  workSpaces: WorkSpaceType[],
  addWorkSpace: (workSpace: WorkSpaceType) => void,
  removeWorkSpace: (id: number) => void
}

const todosStore = create<AllTodosType>((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (id) => set((state) => ({ todos: state.todos.filter(t => t.id != id) })),

  removeTodos: (listId, workSpaceId) => set((state) =>
    ({ todos: state.todos.filter(t => t.listId != listId || t.workSpaceID != workSpaceId) })),
}))

const listsStore = create<AllListsType>((set) => ({
  lists: [],
  addList: (list) => set((state) => ({ lists: [...state.lists, list] })),
  removeList: (id) => set((state) => ({ lists: state.lists.filter(l => l.id != id) }))
}))

const workSpacesStore = create<ALlWorkSpacesType>((set) => ({
  workSpaces: [],
  addWorkSpace: (workSpace) => set((state) => ({ workSpaces: [...state.workSpaces, workSpace] })),
  removeWorkSpace: (id) => set((state) => ({ workSpaces: state.workSpaces.filter(w => w.id != id) }))
}))


export { todosStore, listsStore, workSpacesStore }