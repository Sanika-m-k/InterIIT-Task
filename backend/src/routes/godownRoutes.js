const express = require('express');
const router = express.Router();
const Godown = require('../models/godownModel');


router.get('/', async (req, res) => {
  try {
    console.log("get godowns")
    const godowns = await Godown.find();
    res.json(godowns);
    console.log("godowns",godowns)
  } catch (error) {
    console.log("500")
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const godown = await Godown.findById(req.params.id);
    if (!godown) return res.status(404).json({ message: 'Godown not found' });
    res.json(godown);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
