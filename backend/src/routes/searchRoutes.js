const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel');

router.get('/', async(req,res)=>{
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