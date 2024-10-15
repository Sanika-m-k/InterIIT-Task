import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tree from "./Tree";
import ItemDetails from "./ItemDetails";
import { FiLogOut } from "react-icons/fi"; 
import axios from "axios";
import baseurl from "../config";


const Home = () => {
  const { itemId } = useParams(); // Use camelCase for URL param
  const [selectedItem, setSelectedItem] = useState(null);
  const [mainLocations, setMainLocations] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchMainLocations = async () => {
      try {
        const res = await axios.get(`${baseurl}/api/locations/main`); 
        setMainLocations(res.data); 
      } catch (error) {
        console.error("Error fetching main locations:", error);
      }
    };
    fetchMainLocations(); 
  }, []);

  const getSelectedItemDetails = async () => {
    if (itemId) {
      try {
        const res = await axios.get(`${baseurl}/api/items/${itemId}`); 
        setSelectedItem(res.data); // Correctly set the item data
      } catch (error) {
        console.error("Error fetching item:", error);
        setSelectedItem(null);  // Set to null if not found
      }
    }
  };

  useEffect(() => {
    getSelectedItemDetails();
  }, [itemId]);

  const handleItemSelected = (item) => {
    setSelectedItem(item); // Update the selected item
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="bg-blue-100 flex flex-col md:flex-row h-screen">
    <div className="md:w-1/4 w-full border-b lg:border-b-0 lg:border-r border-blue-800 p-4 bg-blue-100 shadow-md md:overflow-y-scroll">
      <h2 className="text-4xl text-center font-bold text-blue-900 mb-4">
        Godown Inventory
      </h2>
      {mainLocations.length > 0 ? (
        mainLocations.map((location, index) => (
          <Tree
            key={index}
            node={location}
            onItemSelected={handleItemSelected}
            selectedItem={selectedItem}
          />
        ))
      ) : (
        <p className="text-blue-700">Loading main locations...</p>
      )}
    </div>

    <div className="md:w-3/4 w-300px p-4 bg-white">
      {selectedItem ? (
        <ItemDetails selectedItem={selectedItem} />
      ) : (
        <p className="text-blue-700">Select an item to see details</p>
      )}
    </div>

    <div
      onClick={handleLogout}
      className="fixed bottom-4 right-4 cursor-pointer text-black hover:text-red-800 transition duration-300"
      title="Logout"
      role="button"
      tabIndex="0"
    >
      <FiLogOut size={30} />
    </div>
  </div>
  );
};

export default Home;
