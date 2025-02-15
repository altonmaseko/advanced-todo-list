import { useRef } from "react"
import { todoStore } from "../store/todoStore"
import { usePopUp } from "../store/usePopUp"
import { WorkSpaceType, ListType } from "../store/todoStore"

type PopUpType = 'add workspace' | 'add list'

const AddWorkSpacePopUpContent = () => {
  let { addWorkSpace } = todoStore()
  let { setShowPopUp } = usePopUp()

  let name = useRef<HTMLInputElement | null>(null)
  let emoji = useRef<HTMLInputElement | null>(null)

  const handleSave = () => {
    if (!name.current?.value) return

    const workSpace: WorkSpaceType = {
      icon: emoji.current?.value || null,
      id: Date.now(),
      name: name.current.value,
      lists: []
    }

    addWorkSpace(workSpace)
    setShowPopUp(false)
  }


  return (
    <>
      <h1>add work space</h1>
      <input ref={name} className="p-2 rounded-lg border-2 text-black" placeholder="name of work space" type="text" />
      <input ref={emoji} className="p-2 rounded-lg border-2 text-black" placeholder="emoji - optional" type="text" />
      <button onClick={handleSave} className="gap-2 rounded-lg px-4 py-2 border-2 w-fit transition-all hover:scale-105 active:scale-95">save</button>
    </>
  )
}

const AddListPopUpContent = () => {

  let { addList, selectedWorkSpaceId } = todoStore()
  let { setShowPopUp } = usePopUp()

  let name = useRef<HTMLInputElement | null>(null)
  let emoji = useRef<HTMLInputElement | null>(null)

  const handleSave = () => {
    if (!name.current?.value) return

    const list: ListType = {
      icon: emoji.current?.value || null,
      id: Date.now(),
      name: name.current.value,
      todos: []
    }

    addList(selectedWorkSpaceId!, list)
    setShowPopUp(false)
  }

  return (
    <>
      <h1>add list</h1>
      <input ref={name} className="p-2 rounded-lg border-2 text-black" placeholder="name of list" type="text" />
      <input ref={emoji} className="p-2 rounded-lg border-2 text-black" placeholder="emoji - optional" type="text" />
      <button onClick={handleSave} className="gap-2 rounded-lg px-4 py-2 border-2 w-fit transition-all hover:scale-105 active:scale-95">save</button>
    </>
  )
}

export { AddListPopUpContent, AddWorkSpacePopUpContent, type PopUpType }