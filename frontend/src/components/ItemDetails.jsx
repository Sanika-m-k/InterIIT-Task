import React from "react";
import { FaTag, FaBoxes, FaBoxOpen, FaCheckCircle, FaTimesCircle, FaDollarSign } from "react-icons/fa";

const ItemDetails = ({ selectedItem }) => {
  if (!selectedItem) {
    return <div className="text-gray-500">Please select an item.</div>;
  }

  const isInStock = selectedItem.status === 'in_stock';

  return (
    <>
      <div className="p-6 bg-blue-200 rounded-md shadow-lg border border-blue-900 flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2 flex mr-6 justify-center mb-4 md:mb-0">
          <a
            href={selectedItem.image_url}
            target="_blank"
            rel="noopener noreferrer"
            className="h-[550px] w-full md:w-auto relative rounded-md"
          >
            <img
              src={selectedItem.image_url}
              alt={selectedItem.name}
              className="h-full w-full md:w-auto object-contain rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            />
          </a>
        </div>

        {/* Right Side: Item Details */}
        <div className="w-full md:w-1/2 p-6 bg-blue-50 rounded-lg shadow-lg">
          {/* Product Name */}
          <h3 className="text-2xl font-bold text-blue-500 mb-4 md:text-left text-center">
            {selectedItem.name}
          </h3>

          {/* Product Brand */}
          <p className="text-lg text-blue-900 mb-6 md:text-left text-center flex items-center justify-center md:justify-start">
            <span className="font-serif text-2xl italic text-blue-900 mr-2">
              <FaTag className="inline-block mr-2" /> {selectedItem.brand}
            </span>
          </p>

          {/* Product Category */}
          <div className="text-md text-blue-700 mb-6 md:text-left text-center flex items-center justify-center md:justify-start">
            <FaBoxOpen className="text-blue-600 mr-2" />
            <span>{selectedItem.category}</span>
          </div>

          {/* Price - Updated with Attractive Design */}
          <div className="mb-6 text-center md:text-left">
            <div className="font-bold text-md">
              <span className="text-xl font-bold text-blue-900">
                <FaDollarSign className="mr-2 inline-block text-blue-900 " />
                {selectedItem.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6 text-center md:text-left ">
            <span className="font-bold text-xl text-blue-900">
              <FaBoxes className="inline-block text-blue-900 mr-2" />
              
              {selectedItem.quantity}
            </span>
          </div>

          <p className="mb-6 text-center md:text-left flex items-center justify-center md:justify-start">
            {isInStock ? (
              <FaCheckCircle className="text-green-600 text-1xl mr-2" />
            ) : (
              <FaTimesCircle className="text-red-500 text-1xl mr-2" />
            )}
            <span
              className={`${
                isInStock ? "text-blue-600" : "text-red-600"
              }  text-xl`}
            >
              {isInStock ? "In Stock" : "Out of Stock"}
            </span>
          </p>

          {/* Attributes Section */}
          <div className="mt-12">
            <strong className="text-blue-800 text-lg block mb-2">Attributes:</strong>
            <ul className="list-disc list-inside text-blue-700">
              {selectedItem.attributes &&
                Object.entries(selectedItem.attributes).map(([key, value]) => (
                  <li key={key} className="mb-1 flex items-center">
                    <span className="font-medium capitalize mr-2">{key.replace("_", " ")}</span>
                    <span className="font-semibold text-blue-900">{value}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
