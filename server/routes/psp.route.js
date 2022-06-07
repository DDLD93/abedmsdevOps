const multer = require('multer');
const uuid = require('uuid').v4;
const PSPCtrl = require("../controller/psp.controller")
const jwt = require("jsonwebtoken")
const Psp = require("../model/psp.model")


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

    api.post("/login", async (req, res) => {
      try {
        let data = req.body
        const user = await Psp.findOne({ email: data.email });
        if (!user) return res.status(400).json({ status: "failed", message: "Invalid email or password" });
        if (user.password !== data.password) return res.status(400).json({ status: "failed", message: "Invalid email or password" });
        
        const token = await jwt.sign({
          id: user._id,
          email: user.email,
          name: user.name,
        }, "+Y9FYqpJxJGeRy9aj1NOCbmAPZt/IKqPuDBJNf+gbuuK7nXuC82UA1kKSQju+TiqxhQwYCJgPcBn0lIdkA4KDj9F++U14AeVeCn3sbxBxqsykd7UOXEMrwUN808Io1cr02V5n3jm9Z6vVGxxbfkjepQ63zF2M6U7IkTNW15wGnM6cST6uPHVZOL1tl0bcosh536JCdIE6VNsaWgFfNSEbKCncDeQ9GQlUwDgrgQbeNQRyFYVIAeJx2F5Fv69e5/oZk25hRZPUMrXfrxGiWdmUX71df39OCycsD4aNog4xz3o9bjT6tJIqqAX7mQK5Gjce5VpilqY+z0SZVeylc5E6Q==", { expiresIn: '1h' })
        console.log("token",token)
        res.json({ status: "success", user: user, token });
      } catch (error) {
        res.send(error);
      }
    });

    api.get("/", async (req, res) => {
     
      let status = await PSPCtrl.getPSPs()
      if (status.ok) {
        if (status.psps) return res.status(200).json(status.psps);
        res.status(200).json([]);
      } else {
        res.status(500).json(status.error);
      }
    });
    api.get("/:id", async (req, res) => {
      let {id} = req.params
      let status = await PSPCtrl.getPSP(id)
      if (status.ok) {
        if (status.psp) return res.status(200).json(status.psp);
        res.status(200).json([]);
      } else {
        res.status(500).json(status.error);
      }
    });

    api.patch("/:id", async (req, res) => {
      let {id} = req.params
      let {amount} = req.body
      console.log(req.body)
      let status = await PSPCtrl.addFunds(id,amount)
      if (status.ok) {
        res.status(201).json(status.psp);
      } else {
        res.status(500).json(status.error);
      }
    });

    
      api.post("/", async (req, res) => {
        let data = req.body
        data.password = 123456
       let status = await PSPCtrl.addPSP(data)
       if(status.ok) {
         return res.status(200).json(status.psp);
        }else{
          return res.status(500).json(status.error);
        }
      })


      return api
}