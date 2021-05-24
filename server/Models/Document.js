const { Schema, model } = require("mongoose");
const { v4 } = require("uuid");

const Document = new Schema({
  _id: {
    type: String,
    required: true,
    default: v4(),
  },
  data: Object,
  name: String,
  createDate: {
    type: Number,
  },
  changedDate: {
    type: Number,
  },
  roles: [String],
  owner: Object
});

module.exports = model("Document", Document);
