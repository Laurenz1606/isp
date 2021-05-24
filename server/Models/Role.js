const { Schema, model } = require("mongoose");
const { v4 } = require("uuid");

const Role = new Schema({
  _id: {
    type: String,
    required: true,
    default: v4(),
  },
  displayName: {
    type: String,
    required: true,
  },
  perms: {
    type: Object,
    required: true,
  },
});

//export the module
module.exports = mongoose.model("role", Role);
