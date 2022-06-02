const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
  fullName: { type: String, required: true, index: true, },
  phone: { type: String, required: true, index: true, unique: true },
  email: { type: String, required: true, index: true, unique: true },
  company: { type: String },
  address: { type: String },
  password: { type: String, required: true },
  state: { type: String },
  pspInfo: {
    states:{type:[String]},
    disbursment:{type:Number,default:0},
    paypoint:{type:Number},
    totalBeneficiaries:{type:Number},
    beneficiariesPaid:{type:Number},
  },
  userType: { type: String, required: true, enum: ["admin", "psp", "staff", "qa", "coordinator", "terminal"] },
  status: { type: String, enum: ["active", "suspended", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
})
module.exports = mongoose.model("User", userSchema);



