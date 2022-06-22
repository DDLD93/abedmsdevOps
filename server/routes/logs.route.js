const logsCtrl = require("../controller/logs.controller")
module.exports = (express) => {
    
    api = express.Router();

    api.get("/", async (req, res) => {
        let status = await logsCtrl.getLogs();
        if (status.ok) {
          res.status(200).json(status.logs);
        } else {
          console.log(status.error)
          res.status(500).json(status.error);
        }
      });
    
 return api
}
