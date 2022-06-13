const amqp = require("amqplib");

const axios = require('axios').default;
// console.log("first test")
// setTimeout(() => {
//   console.log("second test")
//   start();
// }, 5000);

// function start() {
//   console.log("third test")
//   try {
//     console.log("fouth test")
//     RabbitMQ.channel.consume('q', (msg) => {
//       if (msg !== null) {
//         console.log('CONSUMER >>> ', msg.content.toString());
//         processJob(broker.channel, msg);
//       }
//     });
//   } catch (err) {
//     console.log("Consuming RabbitMQ Queue", err)
//   }
// }
async function connect() {
  try {
    const connection = await amqp.connect(`amqp://ujere:123456@rabbitmq:5672`);
    const channel = await connection.createChannel();
    await channel.assertQueue("q");
    channel.consume("q", message => {
      //console.log(`Received message: ${message.content}`);
     processJob(channel,message)
      ;
    });
    console.log(`Waiting for messages...`);
  } catch (ex) {
    setTimeout(() => {
      console.log('Reconnecting to RabbitMQ .... ');
      connect();
    }, 5000);
    console.error(ex);
  }
}
connect()

async function processJob(channel, jobMsg) {
const error = []
  const data = JSON.parse(jobMsg.content.toString());
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
 var errors = 0
 for (let i = 0; i < list.length; i++) {
  try {
    const url = `http://backend:9000/api/beneficiaries/que/add`
   let status =  await axios.post(url, list[i]);
  } catch (err) {
    errors = errors + 1
  }
 }

  let total = Number(data.message.length)
  let invalid = errors
  let dataObj = {
    valid: total - error,
    invalid,
    uploadedBy: {
      id: data.meta.id,
      fullName: data.meta.name,
    },
    status: "awaiting Approval",
  }
  try {
    const url = `http://backend:9000/api/sheet/que/update/${data.id}`
    let status  = await axios.patch(url, dataObj);
    channel.ack(jobMsg)
  } catch (err) {
    console.log(err.message)
  }
  // await sheetCtrl.updateSheet(data.id, dataObj)


}

  // broker.getMsg(async (msg) => {
  //   let data = JSON.parse(msg.content.toString())



