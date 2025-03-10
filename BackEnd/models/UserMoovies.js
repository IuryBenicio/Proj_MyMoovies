const { model } = require("mongoose");
const mongoose = require("../db/conn");
const { Schema } = mongoose;

const MoovieList = mongoose.model(
  "MoovieList",
  new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      moovieList: [
        {
          movieId: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          poster_path: {
            type: String,
            required: true,
          },
        },
      ],
    },
    { timestamps: true }
  )
);
module.exports = MoovieList;
