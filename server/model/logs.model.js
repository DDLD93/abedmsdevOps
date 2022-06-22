const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logsSchema =  new Schema({
    user:{ type: String, required: true, index: true,},
    event:{ type: String,required:true},
    desc:{ type: String,required:true},
    timeStamp:{ type: Date, default: Date.now() },
  })
 module.exports = mongoose.model("Logs",logsSchema)