const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

//categories
const categories_model = new Schema({
  type: { type: String },
  color: { type: String, default: "#FCBE44" },
});

//transaction

const transation_model = new Schema({
  name: { type: String, default: "Anonymous" },
  type: { type: String },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
});

const Categories=mongoose.model('categories',categories_model)

const Transaction=mongoose.model('transaction',transation_model);


exports.default=Transaction;
module.exports={
    Categories,
    Transaction

}
