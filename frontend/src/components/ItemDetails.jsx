import React from "react";

const ItemDetails = ({ selectedItem }) => {
  if (!selectedItem) {
    return <div className="text-gray-500">Please select an item.</div>;
  }

  const isInStock = selectedItem.status === 'in_stock';

  return (
    <>
      <div className="p-6 bg-blue-100 rounded-lg shadow-lg border border-blue-100 flex flex-wrap md:flex-nowrap">
        {/* Left Side: Item Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
          <a
            href={selectedItem.image_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-64 h-auto relative"
          >
            <img
              src={selectedItem.image_url}
              alt={selectedItem.name}
              className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            />
          </a>
        </div>

        {/* Right Side: Item Details */}
        <div className="w-full md:w-1/2 pl-4 flex flex-col justify-center">
          <h3 className="text-3xl font-semibold text-blue-900 mb-6 md:text-left text-center">
            {selectedItem.name}
          </h3>

          <p className="text-lg text-gray-950 text-center md:text-left font-medium mb-4">
          
            <span className="font-serif text-2xl italic text-blue-900">
              {selectedItem.brand}
            </span>
          </p>

          <div className="text-lg text-gray-900">
            <p className="mb-4">
              <strong className="text-blue-950"></strong>
              {selectedItem.category}
            </p>

            
            <p className="mb-4">
              <div className="bg-white p-3 rounded-md shadow-md border border-gray-300 text-gray-800 text-center">${selectedItem.price.toFixed(2)}</div>
            </p>
            <p className="mb-4">
              <strong className="text-blue-950"></strong>
              <span className="font-bold">
                Only {selectedItem.quantity} items are available!
              </span>
            </p>
            <p className="mb-4">
              <strong className="text-blue-950"></strong>
              <span
                className={`${
                  isInStock ? "text-green-600" : "text-red-600"
                } font-bold text-xl`}
              >
                {isInStock ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            {/* Attributes - Enhanced Display */}
            <div className="mb-4">
              <strong className="text-blue-950">Attributes:</strong>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {selectedItem.attributes &&
                  Object.entries(selectedItem.attributes).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="bg-white p-3 rounded-md shadow-md border border-gray-300 text-gray-800 text-center"
                      >
                        <span className="block text-gray-600 text-sm capitalize">
                          {key.replace("_", " ")}
                        </span>
                        <span className="block font-semibold text-lg">
                          {value}
                        </span>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
