const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SheetsSchema =  new Schema({
    total: { type: Number},
    valid:{ type: Number,default:0},
    filePath: {type:String},
    invalid:{ type: Number,default:0},
    uploadedBy:{
      id:{type:String},
      fullName:{type:String},
    },
    approvedBy:{
      id:{type:String},
      fullName:{type:String},
    },
    code:{type:String},
    status : { type: String,emun:["awaiting Approval","valid","rejected","processing","failed","pending"],default:"pending"},
    createdAt: { type: Date, default: Date.now() }, 
  })

  module.exports = mongoose.model("Sheet", SheetsSchema)