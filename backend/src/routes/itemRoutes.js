// /routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel');

router.get('/location/:godown_id', async (req, res) => {
  const godownId = req.params.godown_id;

  try {
    const items = await Item.find({ godown_id: godownId }).select('item_id name');
    
    if (items.length === 0) {
      return res.status(404).json({ message: 'No items found for the given godown_id' });
    }

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items', error: err });
  }
});

router.get('/:item_id', async (req, res) => {
  const itemId = req.params.item_id;

  try {
    const item = await Item.findOne({ item_id: itemId });
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found for the given item_id' });
    }
    console.log("item",item)
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching item details', error: err });
  }
});

router.get('/search', async(req,res)=>{
  try{
    const { name, category, status, brand, minPrice, maxPrice } = req.query;

    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' }; 
    }

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (brand) {
      query.brand = brand;
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    }

    const items = await Item.find(query);

    res.json(items);
  }
  catch(error){
    res.status(500).json({ message: 'Error fetching items', error });

  }
})
module.exports = router;
