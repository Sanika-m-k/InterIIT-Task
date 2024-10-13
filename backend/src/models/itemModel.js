const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  item_id:{type: String, required: true},
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true},
  status: { type: String, enum: ['in_stock', 'out_of_stock'], required: true },
  godown_id: { type: String, ref: 'Godown', required: true },
  brand: { type: String },
  attributes: { type: Map, of: mongoose.Schema.Types.Mixed },
  image_url: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Items', itemSchema);
