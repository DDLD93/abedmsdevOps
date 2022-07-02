const multer = require('multer');
const uuid = require('uuid').v4;
const PSPmodel = require("../model/psp.model")
const Payment = require("../model/payment.model")
const beneCtrl = require("../controller/beneficiaries.controller")
const { Admin, Qa, Staff, PSP} = require("../middleware/auth.middleware")



module.exports = (express, PHOTO_ID) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        const fPath = PHOTO_ID;
        cb(null, fPath);
      },
      filename: function (req, file, cb) {
        const arr = file.originalname.split('.');
        const ext = arr[arr.length - 1];
        const fileUrl = `${uuid().replace(/-/g, '')}.${ext}`;
        req.filePath = './photoID/' + fileUrl;
        cb(null, fileUrl);
      }
    });
  
    const upload = multer({ storage });
    api = express.Router();

    api.get("/", async (req, res) => {
      let status = await beneCtrl.getBeneficiariesCustom()
      if (status.ok) {
        if (status.bene) return res.status(200).json(status.bene);
        res.status(200).json([]);
      } else {
        res.status(500).json(status.error);
      }
    });
    
    api.get("/paypoint",Staff, async (req, res) => {
      let id = req.user.id
      let status = await beneCtrl.getBeneficiariesPaypoint(id)
      if (status.ok) {
        if (status.bene) return res.status(200).json(status.bene);
        res.status(200).json([]);
      } else {
        res.status(500).json(status.error);
      }
    });
    api.get("/qa",Staff, async (req, res) => {
      let state= req.user.state
      
      let status = await beneCtrl.getBeneficiariesByState(state)
      if (status.ok) {
        if (status.bene) return res.status(200).json(status.bene);
        res.status(200).json([]);
      } else {
        res.status(500).json(status.error);
      }
    });
   

    api.get("/state/:state", async (req, res) => {
      let {state}= req.params
      let status = await beneCtrl.getBeneficiariesByState(state)
      if (status.ok) {
        if (status.bene) return res.status(200).json(status.bene);
        res.status(200).json([]);
      } else {
        res.status(500).json(status.error);
      }
    });
    // api.delete("/id", async (req, res) => {
    //   let {id} = req.params
    //    let status = await beneCtrl.getBeneficiariesByLGA(batch,state,lga);
    //    if (status.ok) {
    //      if (status.bene) return res.status(200).json(status.bene);
    //      res.status(200).json([]);
    //    } else {
    //      res.status(500).json(status.error);
    //    }
    //  });
    // api.patch("/biometric", async (req, res) => {
    //   let {id,thumbHash,faceHash} = req.body
    //    let status = await beneCtrl.addBiometric(id,thumbHash,faceHash);
    //    if (status.ok) {
    //      if (status.bene) return res.status(200).json(status.bene);
    //      res.status(200).json([]);
    //    } else {
    //      res.status(500).json(status.error);
    //    }
    //  });
    // api.get("/bene/:id/:num", async (req, res) => {
    //   let id = req.params
    //   console.log(id)
    //   res.send(id)
    //   // let status = await userCtrl.getBeneficiaries();
    //   // if (status.ok) {
    //   //   if (status.bene) return res.status(200).json(status.bene);
    //   //   res.status(200).json([]);
    //   // } else {
    //   //   res.status(500).json(status.error);
    //   // }
    // });

   
      api.post("/add", async (req, res) => {
        let data = req.body
       let status = await beneCtrl.addBeneficiaries(data)
       if(status.ok) {
         return res.status(200).json(status.bene);
        }else{
          return res.status(500).json(status.error);
        }
      })
      api.post("/que/add", async (req, res) => {
        let data = req.body
       let status = await beneCtrl.addBeneficiaries(data)
       if(status.ok) {
         return res.status(200).json(status.bene);
        }else{
          return res.status(500).json(status.error.code);
        }
      })

      api.post("/update/:id",upload.single("photoID"), async (req, res) => {
        let data = JSON.parse(req.body.meta)
        let {id} = req.params
        data.identification.imagePath = req.filePath
        data.status = "verified"
        data.updatedAt = Date.now()
       let status = await beneCtrl.updateBio(id,data)
       if(status.ok) {
         return res.status(200).json(status.bene);
        }else{
          return res.status(500).json(status.error);
        }
      })
      api.post("/biometric/:id",upload.single("image"), async (req, res) => {
        let data = JSON.parse(req.body.meta)
        let {id} = req.params
        data.biometric.imagePath = req.filePath
        data.status = "awaiting payment"
        data.updatedAt = Date.now()
       let status = await beneCtrl.updateBio(id,data)
       if(status.ok) {
         return res.status(200).json(status.bene);
        }else{
          return res.status(500).json(status.error);
        }
      })
      api.post("/payment/:id",PSP,upload.fields("payment"), async (req, res) => {
        let data = JSON.parse(req.body.meta)
        console.log(data)
        let paymentData = JSON.parse(req.body.paymentdata)
        let user = req.user
        let {id} = req.params
        data.payment.imagePath = req.filePath
        data.status = "paid"
        data.updatedAt = Date.now()
       let status = await beneCtrl.updateBio(id,data)
       if(status.ok) {
         await PSPmodel.findOneAndUpdate({company:user.company},{
           $inc:{
             balance:-20
           }
         })
         let pay = new Payment(paymentData)
         pay.company = user.company
         await pay.save()
         return res.status(200).json(status.bene);
        }else{
          return res.status(500).json(status.error);
        }
      })
      api.post("/query", async (req, res) => {
        let {batch,state,lga} = req.body
       let status = await beneCtrl.getBeneficiariesCustom(batch,state,lga)
       if(status.ok) {
         return res.status(200).json(status.bene);
        }else{
          return res.status(500).json(status.error);
        }
      })
      api.get("/lga/:state", async (req, res) => {
        let {state} = req.params
       let status = await beneCtrl.getLGA(state)
       if(status.ok) {
         return res.status(200).json(status.lgaList);
        }else{
          return res.status(500).json(status.error);
        }
      })
      api.get("/ward/:lga", async (req, res) => {
        let {lga} = req.params
       let status = await beneCtrl.getWard(lga)
       if(status.ok) {
         return res.status(200).json(status.wardList);
        }else{
          return res.status(500).json(status.error);
        }
      })
      api.get("/count/:arg", async (req, res) => {
        let {arg} = req.params
        console.log(arg)
        let status = await beneCtrl.getCount(arg)
       if(status.ok) {
         return res.status(200).json(status.count);
        }else{
          return res.status(500).json(status.error);
        }
      })
      api.get("/sheet/:id", async (req, res) => {
        let {id} = req.params
        console.log("id from sheets >>>>> ",id)
        let status = await beneCtrl.getBeneficiariesSheet(id)
       if(status.ok) {
         return res.status(200).json(status.bene);
        }else{
          return res.status(500).json(status.error);
        }
      })
      api.patch("/assign/:id", async (req, res) => {
        let {id} = req.params
        let data = req.body
        console.log(id,data)
        let status = await beneCtrl.assignPSP(data,id)
       if(status.ok) {
         return res.status(200).json(status.count);
        }else{
          return res.status(500).json(status.error);
        }
      })
      api.post("/process/:id", async (req, res) => {
        let {id} = req.params
        let data = req.body
        console.log(id)
        let status = await beneCtrl.processed(data,id)
       if(status.ok) {
         return res.status(200).json(status.count);
        }else{
          return res.status(500).json(status.error);
        }
      })
      // api.get("/sheet", async (req, res) => {
      //   try {
      //     let sheetArr = await Sheet.find()
      //     return res.status(200).json(sheetArr);
      //   } catch (error) {
      //     return res.status(500).json(error);
      //   }

      // })

      return api
}