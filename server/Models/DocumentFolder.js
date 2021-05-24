const { Schema, model } = require("mongoose");
const { v4 } = require("uuid");

const DocumentFolder = new Schema({
  _id: {
    type: String,
    required: true,
    default: v4(),
  },
  data: [Object],
  createDate: {
    type: Number,
  },
  name: String,
  owner: Object,
  path: String,
});

module.exports = model("DocumentFolder", DocumentFolder);
