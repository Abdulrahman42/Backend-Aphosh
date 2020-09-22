const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const itemsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    default: "Indonesia",
  },
  city: {
    type: String,
    required: true,
  },
  isPopular: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  totalRoom: {
    type: Number,
    required: true
  },
  categoryId: {
    type: ObjectId,
    ref: "Categories"
  },
  imageId: [
    {
      type: ObjectId,
      ref: "Images",
    },
  ],
  typeId: [{
    type: ObjectId,
    ref: "TypeItems"
  }],
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
}, { timestamps: true });

module.exports = mongoose.model("Items", itemsSchema);
