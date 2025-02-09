import React from 'react'

function ReportSummary({reportSummary}) {
  return (
    <div>
            <h3 className="text-2xl font-semibold mb-4">Report Summary</h3>
            <p>
              <span className="font-semibold">Total Accounts:</span>{" "}
              {reportSummary.totalAccounts}
            </p>
            <p>
              <span className="font-semibold">Active Accounts:</span>{" "}
              {reportSummary.activeAccounts}
            </p>
            <p>
              <span className="font-semibold">Closed Accounts:</span>{" "}
              {reportSummary.closedAccounts}
            </p>
            <p>
              <span className="font-semibold">Current Balance:</span> ₹
              {reportSummary.currentBalance}
            </p>
            <p>
              <span className="font-semibold">Secured Amount:</span> ₹
              {reportSummary.securedAmount}
            </p>
            <p>
              <span className="font-semibold">Unsecured Amount:</span> ₹
              {reportSummary.unsecuredAmount}
            </p>
            <p>
              <span className="font-semibold">
                Last 7 Days Credit Enquiries:
              </span>{" "}
              {reportSummary.last7DaysCreditEnquiries}
            </p>
          </div>
  )
}

export default ReportSummary