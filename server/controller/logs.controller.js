const Logs = require("../model/logs.model")

class LogsController{
    constructor(){}
    async getLogs(){
        try {
          const logs = await Logs.find()
          return {ok:true, logs};
        } catch (err) {
          return {ok:false,error:err};
        }
      }
      async addLogs(data){
        try {
          const newLogs = await new Logs(data)
          const logs = await newLogs.save()
          return {ok:true, logs};
        } catch (err) {
          return {ok:false,error:err};
        }
      }

} 
module.exports = new LogsController()