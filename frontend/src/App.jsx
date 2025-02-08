import FileUpload from "./components/FileUpload"
import Report from "./components/Report"

function App() {
  
  const handleClearReport = () => {
    localStorage.removeItem("creditReportDocumentId")
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Credit Report App</h1>
          <button
            onClick={handleClearReport}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Clear Stored Report
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4">
        <FileUpload />
        <Report />
      </main>
      <footer className="bg-gray-200 text-center py-4 mt-8">
        <p>&copy; 2023 Credit Report App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App

