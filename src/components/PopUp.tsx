import { createPortal } from "react-dom"

import { motion } from 'motion/react'
import { IoClose } from "react-icons/io5"
import { AddListPopUpContent, AddWorkSpacePopUpContent, PopUpType } from "./PopUpContent"
import { usePopUp } from "../store/usePopUp"

const PopUp = ({ type }: { type: PopUpType }) => {

  let { setShowPopUp, showPopUp } = usePopUp()

  return (
    showPopUp ? createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <motion.div className="text-white relative flex flex-col gap-4 p-4 rounded-lg w-fit h-fit min-w-[300px] min-h-[100px] border-2"
          initial={{
            scale: '10%',
            rotate: -45,
          }}
          animate={{
            scale: '100%',
            rotate: 0,
          }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          {type === "add workspace" ? <AddWorkSpacePopUpContent /> : <AddListPopUpContent />}
          <IoClose onClick={() => setShowPopUp(false)} className="absolute top-2 right-2 hover:cursor-pointer hover:rotate-90 transition-all" size={20} />

        </motion.div>
      </div>,
      document.body) : createPortal(<div></div>, document.body)
  )
}

export default PopUp