const locationModel=require('../models/locationModel');

const buildLocationTree = async (parentId = null) => {
    const locations = await locationModel.find({ parent_godown: parentId });
    const tree = [];
  
    for (const location of locations) {
      const subLocations = await buildLocationTree(location.id);
      
      const items = await Item.find({ godown_id: location.id });
  
      tree.push({
        id: location.id,
        name: location.name,
        subLocations, 
        items: items.map(item => ({
          id: item._id,
          name: item.name,
          brand: item.brand,
          quantity: item.quantity,
          price: item.price,
          category: item.category,
          status: item.status,
          image_url: item.image_url,
        })), 
      });
    }
  
    return tree;
  };

module.exports=buildLocationTree