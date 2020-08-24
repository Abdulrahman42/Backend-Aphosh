const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  tyoe: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  isPopular: {
    type: Boolean,
    require: true,
  },
  itemId: {
    type: ObjectId,
    ref: 'item'
  }
});

module.exports = mongoose.model("Activity", activitySchema);
