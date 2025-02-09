import React from 'react'

function CreditAccounts({creditAccounts}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Credit Accounts
        </h3>
        <div className="space-y-4">
          {creditAccounts.map((account, index) => (
            <div
              key={index}
              className="border-b pb-4 last:border-b-0 flex flex-col sm:flex-row justify-between"
            >
              <div>
                <p>
                  <span className="font-semibold">Bank:</span>{" "}
                  {account.creditCardBank}
                </p>
                <p>
                  <span className="font-semibold">Account Number:</span>{" "}
                  {account.accountNumber}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Amount Overdue:</span> ₹
                  {account.amountOverdue}
                </p>
                <p>
                  <span className="font-semibold">Current Balance:</span> ₹
                  {account.currentBalance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default CreditAccounts