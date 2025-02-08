import { useEffect, useState } from "react"
import axios from "axios"

export default function Report() {
  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReport = async () => {
      const documentId = localStorage.getItem("creditReportDocumentId")

      if (!documentId) {
        setError("No report found. Please upload a credit report first.")
        setIsLoading(false)
        return
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/files/credit-report/${documentId}`)
        setReport(response.data)
      } catch (err) {
        setError("Failed to load report")
      } finally {
        setIsLoading(false)
      }
    }

    fetchReport()
  }, [])

  if (isLoading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>
  if (!report) return <div className="text-center py-8">No report data available</div>

  const { basicDetails, reportSummary, creditAccounts, addresses } = report

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center mb-6">Credit Report</h2>

      {/* Basic Details */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Basic Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p>
              <span className="font-semibold">Name:</span> {basicDetails.name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {basicDetails.mobilePhone}
            </p>
            <p>
              <span className="font-semibold">PAN:</span> {basicDetails.pan}
            </p>
            <p>
              <span className="font-semibold">Credit Score:</span> {basicDetails.creditScore}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Total Accounts:</span> {reportSummary.totalAccounts}
            </p>
            <p>
              <span className="font-semibold">Active Accounts:</span> {reportSummary.activeAccounts}
            </p>
            <p>
              <span className="font-semibold">Closed Accounts:</span> {reportSummary.closedAccounts}
            </p>
            <p>
              <span className="font-semibold">Current Balance:</span> ₹{reportSummary.currentBalance}
            </p>
            <p>
              <span className="font-semibold">Secured Amount:</span> ₹{reportSummary.securedAmount}
            </p>
            <p>
              <span className="font-semibold">Unsecured Amount:</span> ₹{reportSummary.unsecuredAmount}
            </p>
            <p>
              <span className="font-semibold">Last 7 Days Credit Enquiries:</span>{" "}
              {reportSummary.last7DaysCreditEnquiries}
            </p>
          </div>
        </div>
      </div>

      {/* Credit Accounts */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Credit Accounts</h3>
        <div className="space-y-4">
          {creditAccounts.map((account, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <p>
                <span className="font-semibold">Bank:</span> {account.creditCardBank}
              </p>
              <p>
                <span className="font-semibold">Account Number:</span> {account.accountNumber}
              </p>
              <p>
                <span className="font-semibold">Amount Overdue:</span> ₹{account.amountOverdue}
              </p>
              <p>
                <span className="font-semibold">Current Balance:</span> ₹{account.currentBalance}
              </p>
              <p>
                <span className="font-semibold">Open Date:</span>{" "}
                {account.openDate === "Invalid Date" ? "Not Available" : account.openDate}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Addresses */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Address</h3>
        <div className="space-y-4">
          {addresses.map((address, index) => (
            <div key={index}>
              <p>
                <span className="font-semibold">Address:</span> {address.firstLine}, {address.secondLine},{" "}
                {address.thirdLine}
              </p>
              <p>
                <span className="font-semibold">City:</span> {address.state}
              </p>
              <p>
                <span className="font-semibold">Zip Code:</span> {address.zipCode}
              </p>
              <p>
                <span className="font-semibold">Country Code:</span> {address.countryCode}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

