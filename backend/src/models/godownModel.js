const mongoose = require('mongoose');

const godownSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  parent_godown: { type: mongoose.Schema.Types.ObjectId, ref: 'Godowns', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Godowns', godownSchema);
