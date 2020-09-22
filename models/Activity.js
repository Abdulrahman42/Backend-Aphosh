const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tyoe: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isPopular: {
    type: Boolean,
    required: true,
  },
  itemId: {
    type: ObjectId,
    ref: 'item'
  }
});

module.exports = mongoose.model("Activity", activitySchema);
