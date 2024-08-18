import { useSelector, useDispatch } from "react-redux"
import { VscDebugRestart } from "react-icons/vsc"
import { LuListRestart } from "react-icons/lu"
import { IoIosRemoveCircle, IoMdAddCircle } from "react-icons/io"
import { MdKeyboardArrowDown } from "react-icons/md"
import {
  addEH,
  removeEH,
  resetEH,
  updateEHName,
  resetAll,
  setIsEHListOpen,
} from "../../service/slices/ehListSlice"

const EHList = () => {
  const dispatch = useDispatch()
  const { ehs, isEHListOpen } = useSelector((state) => state.ehList)

  return (
    <div className="mx-auto mt-8 max-w-lg rounded-md border border-zinc-400 bg-zinc-400/20">
      <button
        onClick={() => dispatch(setIsEHListOpen(!isEHListOpen))}
        className="flex w-full items-center justify-between p-4"
      >
        <h2 className="text-lg font-semibold">EH List reminder</h2>
        <MdKeyboardArrowDown
          className={`size-6 transform transition-transform duration-300 ${
            isEHListOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isEHListOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="space-y-4 p-4">
          {ehs.map((eh, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={eh.name}
                onChange={(e) =>
                  dispatch(updateEHName({ index, name: e.target.value }))
                }
                placeholder="EH Name"
                className="flex-1 rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200"
              />
              <button
                onClick={() => dispatch(resetEH(index))}
                className="flex size-8 items-center justify-center rounded-full bg-yellow-500 text-zinc-200 hover:bg-yellow-700"
              >
                <VscDebugRestart className="size-4" />
              </button>
              <button
                onClick={() => dispatch(removeEH(index))}
                className="flex size-8 items-center justify-center rounded-full bg-red-500 text-zinc-200 hover:bg-red-700"
              >
                <IoIosRemoveCircle className="size-4" />
              </button>
            </div>
          ))}
          <div className="flex space-x-2">
            <button
              onClick={() => dispatch(addEH())}
              className="flex size-8 items-center justify-center rounded-md bg-teal-500 hover:bg-teal-700"
            >
              <IoMdAddCircle className="size-4" />
            </button>
            <button
              onClick={() => dispatch(resetAll())}
              className="flex size-8 items-center justify-center rounded-md bg-gray-500 text-zinc-200 hover:bg-orange-700"
            >
              <LuListRestart className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EHList
