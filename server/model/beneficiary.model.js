const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const beneficiarySchema = new Schema({
  fullName: { type: String, },
  serialNo:{type:Number},
  batch: { type: String },
  age: { type: String },
  gender: { type: String },
  maritalStatus: { type: String, },
  phone: { type: String, unique:true, required : true, dropDups: true },
  state: { type: String, index:true },
  lga: { type: String },
  ward: { type: String },
  sheetCode: { type: String,index:true },
  sheetId:{type: String,index:true  },
  occupation: { type: String },
  address: { type: String, },
  status: { type: String,index:true , emun: ["uploaded","processing", "approved", "paid", "rejected"], default: "uploaded" },
  disability: { type: String },
  pspId:{type:String},
  identification: {
    type: { type: String },
    guarantor: { type: String },
    idNo: { type: String,},
    imagePath: { type: Buffer }
  },
  biometric: {
    dateCapture: { type: Date },
    imagePath: { type: String },
    thumbHash: { type: Buffer },
  },
  payment: {
    methodOfPayment: { type: String },
    company: { type: String },
    amount: { type: Number },
    remark: { type: String },
    imagePath: { type: Buffer }
  },
  updatedAt: { type: Date, },
  createdAt: { type: Date, default: Date.now() }
});
module.exports = mongoose.model("Beneficiary", beneficiarySchema)



