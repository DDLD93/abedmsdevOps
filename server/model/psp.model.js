const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pspSchema =  new Schema({
    batch:{type:String},
    name:{ type: String,required:true},
    email:{type:String,unique:true},
    password:{type:String},
    disbursment:{type:Number,default:0},
    userType: { type: String, default:"psp"},
    states:{type:[String]},
    paypoint:{type:Number},
    totalBeneficiaries:{type:Number},
    beneficiariesPaid:{type:Number},
    phone:{ type: String, required:true,unique:true},
    createdAt: { type: Date, default: Date.now() },
  
  })
 module.exports = mongoose.model("psp",pspSchema)