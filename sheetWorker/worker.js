const config = require("./config");
const broker = require("./rabbitmq.connection")
const axios = require('axios').default;
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
    
    list.forEach(async (li) => {
      try {
        const url = `${config.endPoint}/beneficiaries/que/add`
        await axios.post(url,li);
      } catch (err) {
        console.log("error you probaly abort")
      }
    })
    let total = Number(data.message.length)
    let invalid = Number(error.length)
    let dataObj = {
      valid: total - error,
      invalid,
      uploadedBy: {
        id: data.meta.id,
        fullName: data.meta.name,
      },
      status:"awaiting Approval",
    }
    //console.log(dataObj)
    try {
      const url = `${config.endPoint}/sheet/que/update/${data.id}`
      await axios.patch(url,dataObj);
    } catch (err) {
      console.log("error you need abort", err.message)
    }
   // await sheetCtrl.updateSheet(data.id, dataObj)
    //broker.channel.ack(msg)

  })
