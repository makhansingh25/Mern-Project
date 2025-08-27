// models/room.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const carSchema = new Schema(
  {
    image: {
      type: [String],
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    feature: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("car", carSchema);
