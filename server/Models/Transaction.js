//dependencies
const { Schema, model } = require("mongoose");
const { v4 } = require("uuid");

//create the database model
const TransactionSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  date: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    require: true,
  }
});

//export the module
module.exports = model("transaction", TransactionSchema);
