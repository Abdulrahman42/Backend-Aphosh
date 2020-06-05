const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
  bookingStartDate: { type: Date, require: true },
  bookingEndDate: { type: Date, require: true },
  itemID: [
    {
      _id: {
        type: ObjectId,
        ref: "Item",
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      night: {
        type: number,
        require: true,
      },
    },
  ],
  memberId: [
    {
      type: ObjectId,
      require: true,
      ref: "Member",
    },
  ],
  bankId: [
    {
      type: ObjectId,
      require: true,
      ref: "Bank",
    },
  ],
  proofPayment: {
    type: String,
    require: true,
  },
  bankForm: {
    type: String,
    require: true,
  },
  accountHolder: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
