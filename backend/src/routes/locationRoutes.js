const express = require('express');
const router = express.Router();
const Locations = require('../models/locationModel');
const buildLocationTree=require('../Controllers/locationController')

router.get('/main', async (req, res) => {
  try {
    const locations = await Locations.find({ parent_godown: null });
    res.json(locations);
  } catch (error) {
    console.log("500")
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id/sublocations', async (req, res) => {
  const locationId = req.params.id;

  try {
    const sublocations = await Locations.find({ parent_godown: locationId });
    if (sublocations.length === 0) {
      return res.status(404).json({ message: 'No sublocations found' });
    }
    res.status(200).json(sublocations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sublocations', error: err });
  }
});




module.exports = router;
