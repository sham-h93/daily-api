const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  createdDate: {
    type: String,
  },
  modifiedDate: {
    type: String,
  },
});

module.exports = mongoose.model("Note", noteSchema);
