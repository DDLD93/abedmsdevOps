const amqp = require("amqplib");
const q = 'q';

class RabbitMQConnection {
    constructor() {
        this.connection = null
        this.channel = null
        this.#init()
       
    }
    async #init() {
        try {
            this.connection = await amqp.connect('amqp://ujere:123456@rabbitmq:5672', 'heartbeat=60');
            this.channel = await this.connection.createChannel();
            await this.channel.assertQueue(q, { durable: true });
            console.log('Connected to RabbitMQ ..');
        } catch (err) {
            console.log('Error connecting to RabbitMQ: ', err);
            setTimeout(() => {
                console.log('Reconnecting to RabbitMQ .... ');
                this.#init();
            }, 5000);
        }
    }
    async sendMsg(data) {
        if (!this.connection) await this.#init()
        try {
            this.channel.sendToQueue(q, Buffer.from(JSON.stringify(data)),{presistent:true})
        } catch (err) {
            console.error(err)
        }
    }
    // async getMsg(handler) {
    //     if (!this.connection) await this.#init()
    //     try {
    //         this.channel.consume(q,handler)
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }
}
module.exports = new RabbitMQConnection()