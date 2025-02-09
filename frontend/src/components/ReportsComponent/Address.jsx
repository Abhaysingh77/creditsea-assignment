import React from 'react'

function Address({addresses}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4">Address</h3>
        <div className="space-y-4">
          {addresses.map((address, index) => (
            <div key={index}>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {address.firstLine}, {address.secondLine}, {address.thirdLine}
              </p>
              <p>
                <span className="font-semibold">City:</span> {address.state}
              </p>
              <p>
                <span className="font-semibold">Zip Code:</span>{" "}
                {address.zipCode}
              </p>
              <p>
                <span className="font-semibold">Country Code:</span>{" "}
                {address.countryCode}
              </p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Address