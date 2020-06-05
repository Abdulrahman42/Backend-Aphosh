const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  bankName: {
    type: String,
    require: true,
  },
  accountNumber: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Bank", bankSchema);
