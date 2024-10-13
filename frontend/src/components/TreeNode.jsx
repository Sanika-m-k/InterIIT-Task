import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight, FaFolder, FaFolderOpen, FaImage } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import axios from "axios";
import baseurl from "../config";

const TreeNode = ({ node, onItemSelected, selectedItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [subLocations, setSubLocations] = useState(node.subLocations || []); // Initially passed sublocations
  const [isLoading, setIsLoading] = useState(false);

  const toggleExpand = async () => {
    setIsExpanded(!isExpanded);

    if (!subLocations.length && !isExpanded) {
      // If there are no sublocations and we are expanding, fetch sublocations
      try {
        setIsLoading(true);
        const res = await axios.get(`${baseurl}/api/locations/sublocations/${node.id}`);
        setSubLocations(res.data); // Set the fetched sublocations
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching sublocations:", error);
        setIsLoading(false);
      }
    }
  };

  const handleItemClick = (item) => {
    onItemSelected(item); // Pass the selected item up to the parent component
  };

  const isSelected = (item) => selectedItem && selectedItem.item_id === item.item_id;

  return (
    <div className="min-w-0">
      <div
        className="flex items-center cursor-pointer p-2 rounded-md hover:bg-blue-50 transition duration-300"
        onClick={toggleExpand}
      >
        <span className="mr-2 text-blue-800">
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        </span>
        <span className="mr-2 text-blue-950">
          {isExpanded ? <FaFolderOpen /> : <FaFolder />}
        </span>
        {node.name && (
          <span className="font-medium text-blue-950 break-words">{node.name}</span>
        )}
      </div>

      {isLoading && <p>Loading...</p>}

      {isExpanded && subLocations && (
        <div className="ml-4">
          {subLocations.map((subNode, index) => (
            <TreeNode
              key={index}
              node={subNode}
              onItemSelected={onItemSelected}
              selectedItem={selectedItem}
            />
          ))}
        </div>
      )}

      {isExpanded && node.items && (
        <div className="ml-6">
          {node.items.map((item, index) => (
            <div
              key={index}
              className={`flex items-center py-1 cursor-pointer ${
                isSelected(item) ? "text-blue-500 font-bold" : "text-blue-950"
              }`}
              onClick={() => handleItemClick(item)}
            >
              <span className="mr-2">
                <FaImage />
              </span>
              <Link
                to={`/${item.item_id}`}
                className={`hover:text-blue-500 flex items-center cursor-pointer ${
                  isSelected(item) ? "text-blue-500 font-semibold" : "text-blue-950"
                }`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
