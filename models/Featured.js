const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

const featuredSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  qty: {
    type: Number,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  itemId: {
    type: ObjectId,
    ref: 'item'
  }
});

module.exports = mongoose.model("Featured", featuredSchema);
