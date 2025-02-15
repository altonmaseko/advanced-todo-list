import { GoPlusCircle } from "react-icons/go"
import { ListType, todoStore, WorkSpaceType } from "../store/todoStore"
import { useRef, useState } from "react"
import PopUp from "./PopUp"
import { PopUpType } from "./PopUpContent"
import { usePopUp } from "../store/usePopUp"

const Sidebar = () => {

  const { workSpaces,
    selectedWorkSpaceId,
    setSelectedWorkSpaceId,
    setSelectedListId,
    getCurrentLists
  } = todoStore()
  const { setShowPopUp } = usePopUp()

  let [popUpType, setPopUpType] = useState<PopUpType>('add workspace')

  let workSpacesContainer = useRef<HTMLDivElement | null>(null)
  let listsContainer = useRef<HTMLDivElement | null>(null)

  const handleWorkSpaceClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, w: WorkSpaceType) => {
    setSelectedWorkSpaceId(w.id)
    setSelectedListId(null)

    Array.from(listsContainer.current?.children || []).forEach(l => l.classList.remove('selected'))
    Array.from(workSpacesContainer.current?.children || []).forEach(w => w.classList.remove('selected'))
    e.currentTarget.classList.add('selected')
  }

  const handleListClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, l: ListType) => {
    setSelectedListId(l.id)

    Array.from(listsContainer.current?.children || []).forEach(l => l.classList.remove('selected'))
    e.currentTarget.classList.add('selected')
  }

  const handleAddWorkSpaceClick = () => {
    setPopUpType('add workspace')
    setShowPopUp(true)
  }

  const handleAddListClick = () => {
    if (!selectedWorkSpaceId) return
    setPopUpType('add list')
    setShowPopUp(true)
  }

  return (

    <div className="w-[250px] flex flex-col gap-8 p-6 border-r-[1px] border-slate-100">
      {/* Work spaces section */}
      <div className="flex flex-col gap-4">
        <h1>Work Spaces</h1>
        <div ref={workSpacesContainer} className="flex flex-col gap-2">
          {workSpaces.map((w, i) => (
            <div
              onClick={(e) => handleWorkSpaceClick(e, w)}
              key={i} className="flex gap-2 pl-4 bg-[#343746] p-2 rounded-lg transition-all hover:cursor-pointer active:scale-[0.98] "> <span>{w.icon}</span> <p>{w.name}</p> </div>
          ))}
        </div>
        <button onClick={handleAddWorkSpaceClick} className="flex gap-2 rounded-lg px-4 py-2 items-center border-2 w-fit transition-all hover:scale-105 active:scale-95"><GoPlusCircle size={20} /> add work space </button>
      </div>
      {/* Lists Section */}
      <div className="pl-4 border-l-[1px] flex flex-col gap-4">
        <h2>Lists</h2>
        <div ref={listsContainer} className="flex flex-col gap-2">
          {getCurrentLists().map((l, i) => (
            <div
              onClick={(e) => handleListClick(e, l)}
              key={i} className="flex gap-2 pl-4 bg-[#343746] p-2 rounded-lg transition-all hover:cursor-pointer active:scale-[0.98]"> <span>{l.icon}</span> <p>{l.name}</p> </div>
          ))}
        </div>
        <button onClick={handleAddListClick} className="flex gap-2 rounded-lg px-4 py-2 items-center border-2 w-fit transition-all hover:scale-105 active:scale-95"><GoPlusCircle size={20} /> add list </button>
      </div>
      <PopUp type={popUpType} />
    </div>
  )
}

export default Sidebar






























