//dependencies
const { Schema, model } = require("mongoose");
const { v4 } = require("uuid");

//create the database model
const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: v4(),
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
    default: ["Marketing"],
  },
});

//export the module
module.exports = model("user", userSchema);
