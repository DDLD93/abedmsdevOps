const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const beneficiarySchema = new Schema({
  fullName: { type: String, },
  serialNo: { type: Number },
  batch: { type: String },
  age: { type: String },
  gender: { type: String },
  maritalStatus: { type: String, },
  phone: { type: String, unique: true, required: true, dropDups: true },
  state: { type: String, index: true },
  lga: { type: String },
  ward: { type: String },
  sheetCode: { type: String, index: true },
  sheetId: { type: String, index: true },
  address: { type: String, },
  status: { type: String, index: true, emun: ["uploaded", "processing", "approved", "paid", "rejected"], default: "uploaded" },
  pspId: { type: String },
  identification: {
    type: { type: String },
    occupation: { type: String },
    disability: { type: String },
    guarantor: { type: String },
    idNo: { type: String, },
  },
  biometric: {
    dateCapture: { type: Date },
    documentHash: { type: Buffer },
    imageHash: { type: Buffer },
    thumbHash: { type: Buffer },
  },
  payment: {
    accNo: { type: Number },
    bankName: { type: String },
    transRef: { type: String },
    method: { type: String },
    company: { type: String },
    amount: { type: Number },
    remark: { type: String },
    imageHash: { type: String }
  },
  updatedAt: { type: Date, },
  createdAt: { type: Date, default: Date.now() }
});
module.exports = mongoose.model("Beneficiary", beneficiarySchema)



