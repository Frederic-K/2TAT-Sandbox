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
      return line.replace(/ {2,}/g, (match) => "&nbsp;".repeat(match.length))
    })

    const formattedHtml = `<pre style="font-family: monospace; white-space: pre; line-height: 0.8;">${formattedLines.join("\n")}</pre>`
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
