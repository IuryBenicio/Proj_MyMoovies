const mongoose = require("mongoose");

// Conctando ao mongoose
async function main() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => console.log(error));
}

main();

module.exports = mongoose;
