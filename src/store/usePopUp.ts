import { create } from "zustand"

type PopUpType = {
  showPopUp: boolean,
  setShowPopUp: (value: boolean) => void
}

const usePopUp = create<PopUpType>((set) => ({
  showPopUp: false,
  setShowPopUp: (v) => set(() => ({ showPopUp: v }))
}))


export { usePopUp }