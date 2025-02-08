import { useState } from "react"
import axios from "axios"

export default function FileUpload() {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
    setMessage("")
  }

  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file")

    const formData = new FormData()
    formData.append("file", file)

    setIsLoading(true)
    try {
      const response = await axios.post("http://localhost:5000/api/files/upload", formData)
      const { documentId } = response.data

      // Store the documentId in local storage
      localStorage.setItem("creditReportDocumentId", documentId)

      setMessage(`File uploaded successfully. Document ID: ${documentId}`)

      // Trigger a page reload to fetch the new report
      window.location.reload()
    } catch (error) {
      setMessage("Error uploading file")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Upload Credit Report</h2>
      <div className="flex items-center space-x-4">
        <label className="flex-1">
          <span className="sr-only">Choose file</span>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </label>
        <button
          onClick={handleUpload}
          disabled={!file || isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </div>
      {message && (
        <p className={`mt-4 text-sm ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>{message}</p>
      )}
    </div>
  )
}

