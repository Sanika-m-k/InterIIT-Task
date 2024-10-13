import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaFolder, FaFolderOpen, FaImage } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import axios from "axios";

const TreeNode = ({ node, onItemSelected, selectedItem }) => {
  console.log(selectedItem,"sle")
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = (item) => {
    console.log(item);
    onItemSelected(item);
  };

  const isSelected = (item) => selectedItem && selectedItem.name == item.name; // Check if the item is selected

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

      {isExpanded && node.subLocations && (
        <div className="ml-4">
          {node.subLocations.map((subNode, index) => (
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
              }`} // Change color if item is selected
              onClick={() => handleItemClick(item)}
            >
              <span className="mr-2">
                <FaImage />
              </span>
              <Link
                to={`/${item.name}`} // URL hash update
                className={` hover:text-blue-500 flex items-center cursor-pointer ${
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
