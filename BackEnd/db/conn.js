const mongoose = require("mongoose");

async function main() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/mymoovies")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => console.log(error));
}

main();

module.exports = mongoose;
