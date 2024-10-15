import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight, FaFolder, FaFolderOpen, FaImage } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import axios from "axios";
import baseurl from "../config";

const Tree=(node,onItemSelected,selectedItem)=>{
    const [isExpanded, setIsExpanded] = useState(false);
    const [subLocations, setSubLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const[items,setItems]=useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token'); 
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);
    const toggleExpand = async () => {
        setIsExpanded(!isExpanded);
        const id = node.node.id;
    
        if (!subLocations.length && !isExpanded) {
            setIsLoading(true);
            try {
                const res = await axios.get(`${baseurl}/api/locations/${id}/sublocations`);
                if (res.data.length > 0) {
                    setSubLocations(res.data);
                } else {
                    fetchItems(); 
                }
            } catch (error) {
                console.error("Error fetching sublocations:", error);
                fetchItems();
            } finally {
                setIsLoading(false);
            }
        }
    };
    


      const fetchItems = async () => {
        const nodeid=node.node.id
        setIsLoading(true);
        try {
          
          const res = await axios.get(`${baseurl}/api/items/location/${nodeid}`); 
          setItems(res.data); 
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };

    const handleItemSelected = (item) => {
        onItemSelected(item);
        console.log("onsel",item)
      };
      
      const handleItemClick = () => {
        setIsSelected((prev)=>!prev)
      };
    


    return(
        <>
            <div
        className="flex items-center cursor-pointer p-2 rounded-md hover:bg-blue-200 transition duration-300 "
        onClick={toggleExpand}
      >
        <span className="mr-2 text-blue-800">
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        </span>
        <span className="mr-2 text-blue-950">
          {isExpanded ? <FaFolderOpen /> : <FaFolder />}
        </span>
        {node.node.name && (
          <span className="font-medium text-blue-950 break-words">{node.node.name}</span>
        )}
      </div>
      {isLoading && <p>Loading...</p>}

      
{(subLocations.length)?<>
        {isExpanded && subLocations && (
        <div className="ml-4">
          {console.log("subloc",subLocations)}
          {subLocations.map((subNode, index) => (
            <Tree
              key={index}
              node={subNode}
              onItemSelected={onItemSelected}
              selectedItem={selectedItem}
            />
          ))}
        </div>
      )}
      </>:
      <>
      {fetchItems && isExpanded && <div className="ml-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex items-center py-1 cursor-pointer `}
              onClick={handleItemClick}
            >
              <span className="mr-2">
                <FaImage />
              </span>
             <Link
                to= {isLoggedIn?(`/${item.item_id}`):('/login')}
                
                className={`hover:text-blue-500 flex items-center cursor-pointer`}
              >
                {item.name}
              </Link>
              
            </div>
          ))}
        </div>}
        
      </>}

        </>
    )


}

export default Tree;