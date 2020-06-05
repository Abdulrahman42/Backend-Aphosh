const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("Activity", activitySchema);
