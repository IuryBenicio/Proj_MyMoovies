const { model } = require("mongoose");
const mongoose = require("../db/conn");
const { Schema } = mongoose;

const MoovieList = mongoose.model(
  "MoovieList",
  new Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      moovieList: {
        type: Array,
        default: [],
      },
    },
    { timestamps: true }
  )
);
module.exports = MoovieList;
