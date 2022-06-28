const multer = require('multer');
const uuid = require('uuid').v4;
const beneCtrl = require("../controller/beneficiaries.controller")
const broker = require("../connection/rabbitmq.connection")
const excelToJson = require('convert-excel-to-json');
const sheetCtrl = require("../controller/sheet.controller")
const batchCtrl = require("../controller/batch.controller")
const logsCtrl = require("../controller/logs.controller")
const {Admin, Qa, Staff, PSP} = require("../middleware/auth.middleware")



module.exports = (express, UPLOADS) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        const fPath = UPLOADS;
        cb(null, fPath);
      },
      filename: function (req, file, cb) {
        const arr = file.originalname.split('.');
        const ext = arr[arr.length - 1];
        const fileUrl = `${uuid().replace(/-/g, '')}.${ext}`;
        req.filePath = './uploads/' + fileUrl;
        cb(null, fileUrl);
      }
    });
  
    const upload = multer({ storage });
    api = express.Router();

    api.post("/",Staff,upload.single('xlsx'), async (req, res) => {
      var result = null
      try {
          result = excelToJson({
          sourceFile: req.filePath,
          header: {
            rows: 4,
          }
        });
      } catch (error) {
        res.status(500).json(error);
      }
        let date = new Date
         let firstObject = result[Object.keys(result)[0]];
        let c = firstObject[0].G.substring(0, 3).toUpperCase()        
        let code = `${c}/${date.getFullYear().toString()}/${date.getMonth().toString()}`  

        let status = await sheetCtrl.addSheet({total:firstObject.length,code:code,filePath:req.filePath})
          if (status.ok) {
              let batch = await batchCtrl.getBatches()
              broker.sendMsg({
                id:status.sheet._id.toString(),
                code:code,
                message:firstObject,
                meta: req.user,
                batch:batch[0]
            })
            let newLog = {
              user:req.user.name,
              event:"Sheet Upload",
              desc:`A new ${firstObject[0].G}/${code} List has been uploaded by ${req.user.name} `
            }
             await logsCtrl.addLogs(newLog)
            res.status(200).json(status.sheet);
          } else {
            res.status(500).json(status.error);
          }
       
      
      })
      api.get("/", async (req, res) => {
         let status = await sheetCtrl.getSheets()
         if (status.ok) {
           if (status.sheets) return res.status(200).json(status.sheets);
           res.status(200).json([]);
         } else {
           res.status(500).json(status.error);
         }
       });
       api.post("/que/update/:id", async (req, res) => {
         let obj = req.body
        console.log("quee  >>>>>", obj)
         let {id} = req.params
        let status = await sheetCtrl.updateSheet(id,obj)
        if (status.ok) {
          res.status(200).json(status.sheets);
        } else {
          res.status(500).json(status.error);
        }
      });
       api.delete("/:id", async (req, res) => {
           let {id} = req.params;
        let status = await sheetCtrl.deleteSheet(id)
        if (status.ok) {
            await beneCtrl.deleteBeneficiaries(id)
          if (status.sheets) return res.status(200).json(status.sheets);
          res.status(200).json([]);
        } else {
          res.status(500).json(status.error);
        }
      });
      api.post("/approve",Staff, async (req, res) => {

        let {sheetId,status,code}= req.body
        let user = req.user
        let data ={
          approvedBy:{
            fullName : user.name,
            id:user.id
          },
          status
        }
        let resp = await sheetCtrl.updateSheet(sheetId,data)
        if (resp.ok) {
          let newLog = {
            user:req.user.name,
            event:"Sheet Approve",
            desc:`List ${code} has been aprroved by ${req.user.name} `
          }
           await logsCtrl.addLogs(newLog)
          res.status(200).json(resp.sheets)
          await beneCtrl.updateStatus(sheetId,status)
        } else {
          res.status(500).json(resp.error);
        }
      });

      return api

}