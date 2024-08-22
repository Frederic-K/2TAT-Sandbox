import { useState } from "react"
import { LuListRestart } from "react-icons/lu"

import Title from "../components/PageTitle/PageTtile"

const TextFormatter = () => {
  const [inputText, setInputText] = useState("")
  const [formattedText, setFormattedText] = useState("")

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const resetForm = () => {
    setInputText("")
    setFormattedText("")
  }

  const formatText = () => {
    const lines = inputText.split("\n")
    const formattedLines = lines.map((line) => {
      return line.replace(/ {2,}/g, (match) => "&nbsp;".repeat(match.length))
    })

    const formattedHtml = `
      <div style="font-family: 'Courier New', Courier, monospace; font-size: 9pt;">
        ${formattedLines
          .map(
            (line) => `
          <div style="display: flex; margin: 0; padding: 0; line-height: 1.0;">
            <div style="white-space: pre; margin: 0; padding: 0;">${line}</div>
            <div style="margin-left: 20px; width: 200px;"></div>
          </div>
        `,
          )
          .join("")}
      </div>
    `

    setFormattedText(formattedHtml)
  }

  const copyToClipboard = () => {
    const blob = new Blob([formattedText], { type: "text/html" })
    const data = [new ClipboardItem({ "text/html": blob })]
    navigator.clipboard
      .write(data)
      .then(() => alert("Formatted text copied to clipboard!"))
      .catch((err) => console.error("Failed to copy text: ", err))
  }

  return (
    <div className="min-h-screen p-4">
      <Title content="Text Formatter" />
      <div className="mb-1 mt-4">
        <label className="mb-2 block text-xl font-semibold text-orange-700">
          Paste your text here:
        </label>
        <textarea
          className="h-40 w-full rounded border-2 border-zinc-300 p-2 font-mono dark:bg-zinc-300 dark:text-zinc-700"
          value={inputText}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="flex h-11 items-center justify-center rounded-md border border-orange-900 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-700 px-4 py-2 text-lg font-semibold text-zinc-100 hover:from-orange-400 hover:via-orange-700 hover:to-orange-400"
        onClick={formatText}
      >
        Format Text
      </button>
      <div className="mb-1 mt-4">
        <label className="mb-2 block text-xl font-semibold text-orange-700">
          Formatted text:
        </label>
        <textarea
          className="h-40 w-full rounded border-2 border-zinc-300 p-2 font-mono dark:bg-zinc-300 dark:text-zinc-700"
          value={formattedText}
          readOnly
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="flex h-11 items-center justify-center rounded-md border border-teal-900 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-700 px-4 py-2 text-lg font-semibold text-zinc-100 hover:from-teal-400 hover:via-teal-700 hover:to-teal-400"
          onClick={copyToClipboard}
        >
          Copy Formatted Text
        </button>
        <button
          className="flex h-11 items-center justify-center gap-2 rounded-md border border-zinc-900 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 px-4 py-2 text-lg font-semibold text-zinc-100 hover:from-zinc-400 hover:via-zinc-700 hover:to-zinc-400"
          onClick={resetForm}
        >
          <LuListRestart className="size-6" /> Reset
        </button>
      </div>
    </div>
  )
}

export default TextFormatter
