import { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"
import { LuListRestart } from "react-icons/lu"

const Notes = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notes, setNotes] = useState("")

  const handleReset = () => {
    setNotes("")
  }

  return (
    <div className="mx-auto mt-8 max-w-lg rounded-md border border-zinc-400 bg-zinc-400/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4"
      >
        <h2 className="text-lg font-semibold">Notes</h2>
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
        <div className="p-4">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter your notes here..."
            className="w-full rounded-md border p-2 dark:bg-zinc-500 dark:text-zinc-200"
            rows="4"
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleReset}
              className="rounded-md bg-gray-500 px-2 py-2 text-zinc-200 hover:bg-orange-700"
            >
              <LuListRestart className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notes
