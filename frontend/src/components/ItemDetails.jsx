import React from "react";
import { FaTag, FaBoxes, FaBoxOpen, FaCheckCircle, FaTimesCircle, FaDollarSign } from "react-icons/fa";

const ItemDetails = ({ selectedItem }) => {
  if (!selectedItem) {
    return <div className="text-gray-500 text-center p-8">Please select an item.</div>;
  }

  const isInStock = selectedItem.status === 'in_stock';

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 mt-10 rounded-lg shadow-xl">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <a
            href={selectedItem.image_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={selectedItem.image_url}
              alt={selectedItem.name}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </a>
        </div>

        <div className="lg:w-1/2 space-y-6">
          <h3 className="text-3xl font-bold text-gray-800">{selectedItem.name}</h3>

          <div className="flex items-center text-gray-600">
            <FaTag className="mr-2" />
            <span className="text-xl italic">{selectedItem.brand}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <FaBoxOpen className="mr-2" />
            <span>{selectedItem.category}</span>
          </div>

          <div className="flex items-center text-2xl font-bold text-gray-800">
            <FaDollarSign className="mr-1" />
            <span>{selectedItem.price.toFixed(2)}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <FaBoxes className="mr-2" />
            <span>Quantity: {selectedItem.quantity}</span>
          </div>

          <div className="flex items-center">
            {isInStock ? (
              <FaCheckCircle className="text-green-500 mr-2" />
            ) : (
              <FaTimesCircle className="text-red-500 mr-2" />
            )}
            <span className={`text-lg ${isInStock ? "text-green-500" : "text-red-500"}`}>
              {isInStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="border-t border-gray-300 pt-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Attributes</h4>
            <ul className="grid grid-cols-2 gap-4">
              {selectedItem.attributes &&
                Object.entries(selectedItem.attributes).map(([key, value]) => (
                  <li key={key} className="flex flex-col">
                    <span className="text-sm text-gray-500 capitalize">{key.replace("_", " ")}</span>
                    <span className="font-medium text-gray-800">{value}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;