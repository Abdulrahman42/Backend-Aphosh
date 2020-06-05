const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("Featured", featuredSchema);
