import { useState, useContext } from "react";
import { uploadFile } from "../services/credit-report-api";
import { IdContext } from "../context/documentId-context";

export default function FileUpload() {
  const { setId } = useContext(IdContext);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    try {
      const documentId = await uploadFile(formData);
      setId(documentId); // Updating the ID in context
      setMessage("File uploaded successfully");
    } catch (error) {
      setMessage("Error uploading file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Upload Credit Report</h2>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <label className="flex-1 w-full">
          <span className="sr-only">Choose file</span>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </label>
        <button
          onClick={handleUpload}
          disabled={!file || isLoading}
          className="px-4 py-2 bg-[#0088FF] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 w-full sm:w-auto"
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </div>
      {message && <p className={`mt-4 text-sm text-center ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>{message}</p>}
    </div>
  );
}
