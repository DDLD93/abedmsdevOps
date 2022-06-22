const amqp = require("amqplib");

const axios = require('axios').default;
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
const error = 0
  const data = JSON.parse(jobMsg.content.toString());
  const list = data.message.map(field => {
    return {
      serialNo: field.B,
      fullName: field?.C.toLowerCase(),
      age: field.D,
      gender: field?.E.toLowerCase(),
      maritalStatus: field?.F.toLowerCase(),
      state: field?.G.toLowerCase(),
      lga: field?.H.toLowerCase(),
      ward: field?.I.toLowerCase(),
      phone: field.J,
      sheetId: data.id,
      sheetCode: data.code
    }
  })
 var errors = 0
 for (let i = 0; i < list.length; i++) {
  try {
    const url = `http://backend:9000/api/beneficiaries/que/add`
    await axios.post(url, list[i]);
  } catch (err) {
    errors = errors + 1
    console.log(`error @ ${list[i]}>>>>>`, err)
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
    console.log("uploader >>>> ", dataObj)
    const url = `http://backend:9000/api/sheet/que/update/${data.id}`
    await axios.put(url, dataObj);
    channel.ack(jobMsg)
  } catch (err) {
    console.log(err.message)
  }
}



