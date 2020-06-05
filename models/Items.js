const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const itemsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  country: {
    type: String,
    default: "Indonesia",
  },
  city: {
    type: String,
    require: true,
  },
  isPopular: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  imageId: [
    {
      type: ObjectId,
      ref: "Image",
    },
  ],
  featured: [
    {
      type: ObjectId,
      ref: "Featured",
    },
  ],
  activiryId: [
    {
      type: ObjectId,
      ref: "Activity",
    },
  ],
});

module.exports = mongoose.model("Items", itemsSchema);
