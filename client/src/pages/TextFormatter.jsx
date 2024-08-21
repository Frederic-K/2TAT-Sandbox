import { useState } from "react"

const TextFormatter = () => {
  const [inputText, setInputText] = useState("")
  const [formattedText, setFormattedText] = useState("")

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const formatText = () => {
    const lines = inputText.split("\n")
    const formattedLines = lines.map((line) => {
      // Split the line by any whitespace
      const parts = line.split(/\s+/)
      // Join the parts with tabs
      return parts.join("\t")
    })
    setFormattedText(formattedLines.join("\n"))
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(formattedText)
      .then(() => alert("Text copied to clipboard!"))
      .catch((err) => console.error("Failed to copy text: ", err))
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="mb-4 text-2xl font-bold">Text Formatter</h1>
      <div className="mb-4">
        <label className="mb-2 block">Paste your text here:</label>
        <textarea
          className="h-40 w-full rounded border p-2 font-mono"
          value={inputText}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="mr-2 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={formatText}
      >
        Format Text
      </button>
      <div className="mt-4">
        <label className="mb-2 block">Formatted text:</label>
        <textarea
          className="h-40 w-full rounded border p-2 font-mono"
          value={formattedText}
          readOnly
        />
      </div>
      <button
        className="mt-2 rounded bg-green-500 px-4 py-2 text-white"
        onClick={copyToClipboard}
      >
        Copy Formatted Text
      </button>
    </div>
  )
}

export default TextFormatter
