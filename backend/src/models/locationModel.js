const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  _id:{type:String},
  id: { type: String, required: true },
  name: { type: String, required: true },
  parent_godown: { type: String, required: true  },
}, { timestamps: true });

module.exports = mongoose.model('Locations', locationSchema);
