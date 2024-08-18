import { useState } from "react"
import { VscDebugRestart } from "react-icons/vsc"
import { LuListRestart } from "react-icons/lu"
import { IoIosRemoveCircle } from "react-icons/io"
import { IoMdAddCircle } from "react-icons/io"

const EHList = () => {
  const [ehs, setEhs] = useState([{ name: "" }])

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
    <div className="mx-auto mt-8 max-w-lg space-y-4 rounded-md border border-zinc-400 bg-zinc-400/20 p-4">
      <h2 className="text-lg font-semibold">EH List reminder</h2>
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
  )
}

export default EHList
