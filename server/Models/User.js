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
  admin: {
    type: Boolean,
    require: true,
    default: false,
  },
  active: {
    type: Boolean,
    require: true,
    default: true,
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
  provision: {
    type: Object,
    default: {
      currentMonth: {
        prevMonth: 0,
        currentIncome: 0,
        currentOut: 0,
      },
      prevMonths: [
        {
          prevMonth: 0,
          currentIncome: 0,
          currentOut: 0,
        },
      ],
    },
  },
});

//export the module
module.exports = model("user", userSchema);
