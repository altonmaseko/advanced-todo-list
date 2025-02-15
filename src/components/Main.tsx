import { todoStore, TodoType } from "../store/todoStore"
import { FaPlus } from "react-icons/fa"
import { useState } from "react"
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im"

const Main = () => {

  let { getCurrentTodos, addTodo, selectedWorkSpaceId, selectedListId, toggleCompleted } = todoStore()
  let [todoText, setTodoText] = useState<string>('')

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if (!selectedWorkSpaceId || !selectedListId || !todoText) return

    const todo: TodoType = {
      id: Date.now(),
      completed: false,
      text: todoText
    }

    addTodo(selectedWorkSpaceId, selectedListId, todo)
    setTodoText('')
  }

  return (
    selectedListId ?
      <div className="w-full h-full flex flex-col gap-4 p-8">
        <form onSubmit={(e) => handleAddTodo(e)} className="flex flex-col gap-4">
          <input value={todoText} onChange={(e) => setTodoText(e.currentTarget.value)} className="w-full p-2 border-2 text-black rounded-lg" placeholder="add a new todo" type="text" />
          <div className="flex justify-between">
            <h1>Your Todo's</h1>
            <button type="submit" className="self-end flex gap-2 rounded-lg px-4 py-2 items-center border-2 w-fit transition-all hover:scale-105 active:scale-95"><FaPlus size={20} /> add todo </button>
          </div>
        </form>

        <hr />

        <main className="flex flex-col gap-2 overflow-auto px-2 py-1">
          {getCurrentTodos().map((t, i) => <div key={i} className={`flex gap-4 items-center p-2 border-l shadow-white rounded-lg hover:cursor-pointer`}> <div onClick={() => toggleCompleted(t)}>{t.completed ? <ImCheckboxChecked size={20} /> : <ImCheckboxUnchecked size={20} />}</div> <p key={i} className={`${t.completed ? 'line-through  decoration-2' : ''}`}>{t.text}</p></div>)}
        </main>

      </div> :
      <div className="w-full h-full flex flex-col gap-4 p-8">{!selectedWorkSpaceId ? <p>Please select a workspace</p> : !selectedListId ? <p>Please select a list</p> : <p></p>}</div>
  )
}

export default Main