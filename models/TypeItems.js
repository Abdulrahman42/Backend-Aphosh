const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;

const typeItemsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    itemId: {
        type: ObjectId,
        ref: 'Item'
    },
    imageId: [{
        type: ObjectId,
        ref: "Image"
    }]
}, { timestamps: true })

module.exports = mongoose.model("TypeItems", typeItemsSchema)