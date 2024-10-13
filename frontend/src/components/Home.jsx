import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TreeNode from "./TreeNode";
import ItemDetails from "./ItemDetails";
import { FiLogOut } from "react-icons/fi"; 
import axios from "axios";
import baseurl from "../config";

const Home = () => {
  const { item_Id } = useParams(); // Get item name from the URL
  const [selectedItem, setSelectedItem] = useState(null);
  const [mainLocations, setMainLocations] = useState([]);
  const navigate = useNavigate(); // For navigation after logout

  // Fetch main locations on mount
  useEffect(() => {
  const fetchMainLocations = async () => {
    try {
      const res = await axios.get(`${baseurl}/api/locations/main`); // API call for main locations
      setMainLocations(res.data); // Store main locations
    } catch (error) {
      console.error("Error fetching main locations:", error);
    }
  };
  fetchMainLocations(); // Fetch main locations when component mounts
}, []);
  
  useEffect(async() => {
    if (item_Id) {
      const decodedItemId = decodeURIComponent(item_Id); 
      console.log("Decoded item name from URL:", decodedItemId);
      try {
        const item = await axios.get(`${baseurl}/api/items/${item_Id}`); // API call for main locations
        setSelectedItem(item.data); // Store main locations
      } catch (error) {
        console.error("Error fetching item:", error);
      }

      if (item) {
        console.log("Item found:", item);
        setSelectedItem(item);
      } else {
        console.log("Item not found");
        setSelectedItem(null);
      }
    }
  }, [item_Id]);

  const handleItemSelected = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="bg-blue-200 flex flex-col md:flex-row h-screen">
      <div className="md:w-1/4 w-full border-b lg:border-b-0 lg:border-r border-blue-200 p-4 bg-blue-100 shadow-md ">
        <h2 className="text-3xl text-center font-bold text-blue-900 mb-4">
          Godown Inventory
        </h2>
        {mainLocations.length > 0 ? (
          mainLocations.map((location, index) => (
            <TreeNode
              key={index}
              node={location} 
              onItemSelected={handleItemSelected} 
              selectedItem={selectedItem} 
            />
          ))
        ) : (
          <p>Loading main locations...</p>
        )}
      </div>

      <div className="md:w-3/4 w-300px p-4 bg-blue-200">
        {selectedItem ? (
          <ItemDetails selectedItem={selectedItem} />
        ) : (
          <p>Select an item to see details</p>
        )}
      </div>

      <div
        onClick={handleLogout}
        className="fixed bottom-4 right-4 cursor-pointer text-black hover:text-red-600 transition duration-300"
        title="Logout"
      >
        <FiLogOut size={30} />
      </div>
    </div>
  );
};

export default Home;
