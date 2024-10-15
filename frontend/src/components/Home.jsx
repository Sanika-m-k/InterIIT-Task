import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Tree from "./Tree";
import ItemDetails from "./ItemDetails";
import { FiLogOut } from "react-icons/fi"; 
import axios from "axios";
import baseurl from "../config";
import { FaSearch } from 'react-icons/fa'

const Home = () => {
  const { itemId } = useParams(); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [mainLocations, setMainLocations] = useState([]);
  const [message,setMessage]=useState('')
  const navigate = useNavigate(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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

  const handleLogout = async () => {
    try {
      await axios.post(`${baseurl}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem('token'); 
      setMessage('Logged out successfully');
      navigate("/login"); 
    } catch (error) {
      setMessage('Error logging out. Please try again.');
    }
  };

  
  const getSelectedItemDetails = async () => {
    if (itemId) {
      try {
        const res = await axios.get(`${baseurl}/api/items/${itemId}`); 
        setSelectedItem(res.data);
      } catch (error) {
        console.error("Error fetching item:", error);
        setSelectedItem(null);  
      }
    }
  };

  useEffect(() => {
    getSelectedItemDetails();
  }, [itemId]);

  const handleItemSelected = (item) => {
    setSelectedItem(item); 
  };


  return (
    <div className="bg-white flex flex-col md:flex-row h-screen">
    <div className="md:w-1/4 w-full border-b lg:border-b-0 lg:border-r border-blue-800 p-4 bg-white shadow-md md:overflow-y-scroll">
      <h2 className="text-4xl text-center font-bold text-black mb-4">
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
    <div className="flex justify-end items-center space-x-6">
        
        {/* Search Icon with Circle */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-blue-50 transition duration-300 cursor-pointer" >
         {isLoggedIn?(<Link to={'/search'}><FaSearch className="text-gray-600" /></Link> ):(<Link to={'/login'}><FaSearch className="text-gray-600" /></Link> )}
        </div>

        {/* Login Button */}
        <div className="py-2 px-6 border border-gray-300 rounded-full hover:bg-blue-50 transition duration-300">
          {!isLoggedIn?<Link to='/login' className="flex items-center text-gray-700 font-medium">
            Login
          </Link>:<Link onClick={handleLogout} className="flex items-center text-gray-700 font-medium">
            Logout
          </Link>}
        </div>
      </div>
      
      {selectedItem ? (
        <ItemDetails selectedItem={selectedItem} />
      ) : (
        <p className="text-blue-700">Select an item to see details</p>
      )}
    </div>

   
  </div>
  );
};

export default Home;
