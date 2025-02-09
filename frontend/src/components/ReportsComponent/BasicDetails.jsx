import React from 'react'

function BasicDetails({basicDetails}) {
  return (
    <div>
            <h3 className="text-2xl font-semibold mb-4">Basic Details</h3>
            <p>
              <span className="font-semibold">Name:</span> {basicDetails.name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {basicDetails.mobilePhone}
            </p>
            <p>
              <span className="font-semibold">PAN:</span> {basicDetails.pan}
            </p>
            <p>
              <span className="font-semibold">Credit Score:</span>{" "}
              {basicDetails.creditScore}
            </p>
          </div>
  )
}

export default BasicDetails