const { Schema, model } = require("mongoose");
const { v4 } = require("uuid");

const DocumentPreset = new Schema({
  _id: {
    type: String,
    required: true,
    default: v4(),
  },
  presetID: Object,
  name: String,
});

module.exports = model("DocumentPreset", DocumentPreset);
