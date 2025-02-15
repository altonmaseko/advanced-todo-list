import { create } from "zustand";

type TodoType = {
  id: number,
  text: string,
  completed: boolean
}

type ListType = {
  id: number,
  name: string,
  icon: string | null, // emoji
  todos: TodoType[]
}

type WorkSpaceType = {
  id: number,
  name: string,
  icon: string | null, // emoji
  lists: ListType[]
}

type TodoStoreType = {
  workSpaces: WorkSpaceType[],

  selectedWorkSpaceId: number | null,
  setSelectedWorkSpaceId: (wId: number | null) => void,

  selectedListId: number | null,
  setSelectedListId: (lId: number | null) => void,

  toggleCompleted: (t: TodoType) => void,

  getCurrentLists: () => ListType[],
  getCurrentTodos: () => TodoType[],

  addTodo: (workSpaceId: number, listId: number, todo: TodoType) => void,
  removeTodo: (workSpaceId: number, listId: number, todoId: number) => void,

  addList: (workSpaceId: number, list: ListType) => void,
  removeList: (workSpaceId: number, listId: number) => void,

  addWorkSpace: (workSpace: WorkSpaceType) => void,
  removeWorkSpace: (workSpaceId: number) => void
}

const todoStore = create<TodoStoreType>((set, get) => ({
  workSpaces: [],

  toggleCompleted: (t) => set((state) => (
    {
      workSpaces: state.workSpaces.map((w) => {
        if (w.id === state.selectedWorkSpaceId) {
          return {
            ...w, lists: w.lists.map((l) => {
              if (l.id === state.selectedListId) {
                return {
                  ...l, todos: l.todos.map((todo) => {
                    if (todo.id === t.id) {
                      return { ...t, completed: !t.completed }
                    } else return todo
                  })
                }
              } else return l
            })
          }
        } else return w
      })
    }
  )),

  selectedWorkSpaceId: null,
  setSelectedWorkSpaceId: (wId) => set({ selectedWorkSpaceId: wId }),

  selectedListId: null,
  setSelectedListId: (lId) => set(({ selectedListId: lId })),

  getCurrentLists: () => {
    const { workSpaces, selectedWorkSpaceId } = get()
    return workSpaces.find(w => w.id === selectedWorkSpaceId)?.lists || []
  },

  getCurrentTodos: () => {
    const { workSpaces, selectedWorkSpaceId, selectedListId } = get()
    return workSpaces.find(w => w.id === selectedWorkSpaceId)?.lists.find(l => l.id === selectedListId)?.todos || []
  },

  addTodo: (workSpaceId, listId, todo) => set((state) => ({
    workSpaces: state.workSpaces.map((w) => {
      if (w.id === workSpaceId) {
        return {
          ...w, lists: w.lists.map((l) => {
            if (l.id === listId) {
              return { ...l, todos: [...l.todos, todo] }
            } else return l
          })
        }
      } else return w
    })
  })),

  removeTodo: (workSpaceId, listId, todoId) => set((state) => ({
    workSpaces: state.workSpaces.map((w) => {
      if (w.id === workSpaceId) {
        return {
          ...w, lists: w.lists.map((l) => {
            if (l.id === listId) {
              return { ...l, todos: l.todos.filter(t => t.id !== todoId) }
            }
            return l
          })
        }
      } else return w
    })
  })),

  addList: (workSpaceId, list) => set((state) => ({
    workSpaces: state.workSpaces.map((w) => {
      if (w.id === workSpaceId) {
        console.log("workspace found", w)
        return { ...w, lists: [...w.lists, list] }
      } else return w
    })
  })),

  removeList: (workSpaceId, listId) => set((state) => ({
    workSpaces: state.workSpaces.map((w) => {
      if (w.id === workSpaceId) {
        return { ...w, lists: w.lists.filter(l => l.id !== listId) }
      } else return w
    })
  })),

  addWorkSpace: (workSpace) => set((state) => ({
    workSpaces: [...state.workSpaces, workSpace]
  })),

  removeWorkSpace: (workSpaceId) => set((state) => ({
    workSpaces: state.workSpaces.filter(w => w.id !== workSpaceId)
  }))

}))

export { todoStore, type TodoType, type ListType, type WorkSpaceType }