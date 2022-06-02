const broker = require("./connection/rabbitmq.connection")
const beneficiaryCtrl = require("./controller/beneficiaries.controller")
const batchCtrl = require("./controller/batch.controller")
const sheetCtrl = require("./controller/sheet.controller")
module.exports = () => {
  console.log("worker started >>>>>>")

  broker.getMsg(async (msg) => {
    let data = JSON.parse(msg.content.toString())
  
    const list = data.message.map(field => {
      return {
        serialNo: field.B,
        fullName: field.C,
        age: field.D,
        gender: field.E,
        maritalStatus: field.F,
        state: field.G,
        lga: field.H,
        ward: field.I,
        phone: field.J,
        sheetId: data.id,
        sheetCode: data.code
      }
    })
    console.log("list >>>>>>>", list)
    list.forEach(async (li) => {
      try {

        let response = await beneficiaryCtrl.addBeneficiaries(li)
        console.log("responsess from iteration>>>> ",response)
        if(response.ok == false) error.push(1)
       console.log(error.length)
        
      } catch (err) {
        console.log(err)
      }
    })
    let total = Number(data.message.length)
    let invalid = Number(error.length)
    console.log("last log>>>> ",invalid)
    let dataObj = {
      valid: total - error,
      invalid,
      uploadedBy: {
        id: data.meta.id,
        fullName: data.meta.name,
      },
      status:"awaiting Approval",
    }
    console.log(dataObj)
    await sheetCtrl.updateSheet(data.id, dataObj)
    broker.channel.ack(msg)

  })
}
