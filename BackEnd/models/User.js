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
      moovieLists: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            ref: "MoovieList",
          },
          name: {
            type: Schema.Types.String,
            ref: "MoovieList",
          },
        },
      ],
    },
    { timestamps: true }
  )
);

module.exports = User;
