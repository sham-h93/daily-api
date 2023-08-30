const { mongoose } = require("mongoose");

async function connectToDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/notes");
}

module.exports = connectToDb;
