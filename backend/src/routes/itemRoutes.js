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


module.exports = router;
