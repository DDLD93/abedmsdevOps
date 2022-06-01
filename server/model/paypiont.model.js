const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const PaypointSchema = new Schema({
 fullName: { type: String, required: true, index: true, },
  phone: { type: String, required: true, index: true, unique: true },
  email: { type: String, required: true, index: true, unique: true },
  company: { type: String },
  location: { type: String },
  password: { type: String, required: true },
  state: { type: String },
  assignedWards: { type: [String] },
  status: { type: String, enum: ["active", "suspended", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
})
module.exports = mongoose.model("Paypoint", PaypointSchema);



