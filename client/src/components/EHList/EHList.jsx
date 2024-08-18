import { useState } from "react"
import { VscDebugRestart } from "react-icons/vsc"
import { LuListRestart } from "react-icons/lu"
import { IoIosRemoveCircle, IoMdAddCircle } from "react-icons/io"
import { MdKeyboardArrowDown } from "react-icons/md"

const EHList = () => {
  const [ehs, setEhs] = useState([{ name: "" }])
  const [isOpen, setIsOpen] = useState(false)

  const addEH = () => {
    setEhs([...ehs, { name: "" }])
  }

  const removeEH = (index) => {
    const updatedEHs = ehs.filter((_, i) => i !== index)
    setEhs(updatedEHs)
  }

  const resetEH = (index) => {
    const updatedEHs = [...ehs]
    updatedEHs[index] = { name: "" }
    setEhs(updatedEHs)
  }

  const updateEHName = (index, name) => {
    const updatedEHs = [...ehs]
    updatedEHs[index] = { name }
    setEhs(updatedEHs)
  }

  const resetAll = () => {
    setEhs([{ name: "" }])
  }

  return (
    <div className="mx-auto mt-8 max-w-lg rounded-md border border-zinc-400 bg-zinc-400/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4"
      >
        <h2 className="text-lg font-semibold">EH List reminder</h2>
        <MdKeyboardArrowDown
          className={`size-6 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="space-y-4 p-4">
          {ehs.map((eh, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={eh.name}
                onChange={(e) => updateEHName(index, e.target.value)}
                placeholder="EH Name"
                className="flex-1 rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200"
              />
              <button
                onClick={() => resetEH(index)}
                className="flex size-8 items-center justify-center rounded-full bg-yellow-500 text-zinc-200"
              >
                <VscDebugRestart className="size-4" />
              </button>
              <button
                onClick={() => removeEH(index)}
                className="flex size-8 items-center justify-center rounded-full bg-red-500 text-zinc-200"
              >
                <IoIosRemoveCircle className="size-4" />
              </button>
            </div>
          ))}
          <div className="flex space-x-2">
            <button
              onClick={addEH}
              className="flex size-8 items-center justify-center rounded-md bg-green-500 text-zinc-200"
            >
              <IoMdAddCircle className="size-4" />
            </button>
            <button
              onClick={resetAll}
              className="flex size-8 items-center justify-center rounded-md bg-gray-500 text-zinc-200"
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
