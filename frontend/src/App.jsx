import FileUpload from "./components/FileUpload";
import Report from "./components/Report";
import { useContext } from "react";
import { IdContext } from "./context/documentId-context";

function App() {
  const { setId } = useContext(IdContext);

  const handleClearReport = () => {
    setId(""); // Clearing the ID, which will trigger a re-render in Report
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white py-4 mb-8">
        <div className="container mx-auto px-4 sm:flex  sm:justify-between sm:items-center">
          <h1 className="text-3xl font-bold">Credit Report App</h1>
          <button
            onClick={handleClearReport}
            className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-lg shadow-md font-semibold bg-white text-black rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-2 sm:mt-0"
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
        <p>&copy; 2025 Credit Report App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
