const { model } = require("mongoose");
const mongoose = require("../db/conn");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema(
    {
      userName: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      moovies: { type: Array },
    },
    { timestamps: true }
  )
);

module.exports = User;
