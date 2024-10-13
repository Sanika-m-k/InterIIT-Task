import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TreeNode from "./TreeNode";
import ItemDetails from "./ItemDetails";
import { FiLogOut } from "react-icons/fi"; 
import axios from "axios";
import baseurl from "../config";

const Home = () => {
  const { item_Id } = useParams(); 
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
  
  const getSelectedItemDetails=async() => {
    if (item_Id) {
      const decodedItemId = decodeURIComponent(item_Id); 
      console.log("Decoded item name from URL:", decodedItemId);
      try {
        const item = await axios.get(`${baseurl}/api/items/${item_Id}`); 
        setSelectedItem(item.data); 
        if (item) {
          console.log("Item found:", item);
          setSelectedItem(item);
        } else {
          console.log("Item not found");
          setSelectedItem(null);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    }
  }
  useEffect(()=>{
    getSelectedItemDetails()
  },[])

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
        className="fixed bottom-4 right-4 cursor-pointer text-black hover:text-red-800 transition duration-300"
        title="Logout"
      >
        <FiLogOut size={30} />
      </div>
    </div>
  );
};

export default Home;
