import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TreeNode from "./TreeNode";
import ItemDetails from "./ItemDetails";
import { FiLogOut } from "react-icons/fi"; // Import the logout icon
import axios from "axios";
import baseurl from "../config";

const Home = () => {
  const { itemName } = useParams(); // Get item name from the URL
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate(); // For navigation after logout
  const [selectedItemId, setSelectedItemId]=useState(null);

  const godownData = {
    name: "Godown A",
    subLocations: [
      {
        name: "Section 1",
        subLocations: [
          {
            name: "Shelf A",
            items: [
              {
                item_id: "9b7b6b4a543c4bb090de37870a49d70b",
                name: "Black & Decker Screwdriver Series B",
                quantity: 339,
                category: "Tools",
                price: 448.43,
                status: "in_stock",
                godown_id: "b3f0e83bb8ee4e308d759c95e2c3507d",
                brand: "Black & Decker",
                attributes: {
                  type: "Hand Tool",
                  material: "Plastic",
                  warranty_years: 1,
                },
                image_url: "https://m.media-amazon.com/images/I/41-T3GBGYUL.jpg",
              },
              {
                item_id: "663a9d18f1894f6e874f7cedd135e248",
                name: "Samsung Smartphone 62",
                quantity: 111,
                category: "Electronics",
                price: 102.4,
                status: "in_stock",
                godown_id: "f37e12cc6bbf437aba6672628f54efa5",
                brand: "Samsung",
                attributes: {
                  wattage: 56,
                  voltage: 220,
                  color: "AntiqueWhite",
                },
                image_url:
                  "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-f62.jpg",
              },
            ],
          },
          {
            name: "Shelf B",
            items: [
              {
                item_id: "663a9d18f1894f6e874f7cedd135e248",
                name: "Samsung Smartphone 62",
                quantity: 111,
                category: "Electronics",
                price: 102.4,
                status: "in_stock",
                godown_id: "f37e12cc6bbf437aba6672628f54efa5",
                brand: "Samsung",
                attributes: {
                  wattage: 56,
                  voltage: 220,
                  color: "AntiqueWhite",
                },
                image_url:
                  "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-f62.jpg",
              },
            ],
          },
        ],
      },
      {
        name: "Section 2",
        items: [{ name: "Laptop", quantity: 20, price: 500 }],
      },
    ],
  };

  
    const tree=async()=>{
      try{
        const res=await axios.get(
          `${baseurl}/api/locations/locationtree`
        )
        console.log("tree",res)
      }
      catch(error){
        console.log("error fetching tree",error);
      }
    }
    tree();
 

  const handleItemSelected = (item) => {
    setSelectedItem(item);
  };

  // Function to find the item by name
  const findItemByName = (name, node) => {
    if (!node) return null;

    // Case insensitive comparison by normalizing to lowercase
    if (node.items) {
      const foundItem = node.items.find(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      );
      if (foundItem) return foundItem;
    }

    if (node.subLocations) {
      for (const subLocation of node.subLocations) {
        const foundInSubLocation = findItemByName(name, subLocation);
        if (foundInSubLocation) return foundInSubLocation;
      }
    }

    return null;
  };

  useEffect(() => {
    if (itemName) {
      const decodedItemName = decodeURIComponent(itemName); // Decoding URL
      console.log("Decoded item name from URL:", decodedItemName);

      const item = findItemByName(decodedItemName, godownData);

      if (item) {
        console.log("Item found:", item);
        setSelectedItem(item);
      } else {
        console.log("Item not found");
        setSelectedItem(null);
      }
    }
  }, [itemName]);

  // Logout function to clear token and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="bg-blue-200 flex flex-col md:flex-row h-screen">
      {/* Sidebar: Inventory List */}
      <div className="md:w-1/4 w-full border-b lg:border-b-0 lg:border-r border-blue-200 p-4 bg-blue-100 shadow-md ">
        <h2 className="text-3xl text-center font-bold text-blue-900 mb-4">
          Godown Inventory
        </h2>
        <TreeNode node={godownData} onItemSelected={handleItemSelected} selectedItem={selectedItem} />
      </div>

      {/* Main content: Item Details */}
      <div className="md:w-3/4 w-300px p-4 bg-blue-200">
        <ItemDetails selectedItem={selectedItem} />
      </div>

      {/* Logout Icon */}
      <div 
        onClick={handleLogout} 
        className="fixed bottom-4 right-4 cursor-pointer text-black  hover:text-red-600 transition duration-300"
        title="Logout"
      >
        <FiLogOut size={30} /> {/* Logout Icon */}
      </div>
    </div>
  );
};

export default Home;
