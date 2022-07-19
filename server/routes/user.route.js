const multer = require('multer');
const logsCtrl = require("../controller/logs.controller")
const uuid = require('uuid').v4;
const userCtrl = require("../controller/user.controller")
const User = require("../model/user.model")
const jwt = require("jsonwebtoken");
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

  api.get("/", async (req, res) => {
    let status = await userCtrl.getUsers();
    if (status.ok) {
      if (status.users) return res.status(200).json(status.users);
      res.status(200).json([]);
    } else {
      res.status(500).json(status.error);
    }
  });
  api.get("/psp", async (req, res) => {
    let status = await userCtrl.getPspUsers();
    if (status.ok) {
      if (status.users) return res.status(200).json(status.users);
      res.status(200).json([]);
    } else {
      res.status(500).json(status.error);
    }
  });

  api.get("/bypsp", async (req, res) => {
    let company = req.user.company
    let status = await userCtrl.getUsersByCompany(company);
    if (status.ok) {
      if (status.users) return res.status(200).json(status.users);
      res.status(200).json([]);
    } else {
      res.status(500).json(status.error);
    }
  });

  api.get("/:id", async (req, res) => {
    let { id } = req.params;
    let status = await userCtrl.getUser(id);
    if (status.ok) {
      if (status.user) return res.status(200).json(status.user);
      res.status(200).json({});
    } else {
      res.status(500).json(status.error);
    }
  });

  api.post("/admin", async (req, res) => {
    let data = req.body
    try {
      const status = await userCtrl.registerUser(data)
      if (status.ok) {
          return res.status(200).json(status.user);
      } else {
        res.status(500).json(status.error);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });
  api.post("/register",Staff, async (req, res) => {
    let data = req.body
    try {
      const status = await userCtrl.registerUser(data)
      if (status.ok) {
          let newLog = {
            user:req.user.name,
            event:"Account Creation",
            desc:`A new ${data.userType} account || email:${data.email}  was created by ${req.user.name}`
          }
           await logsCtrl.addLogs(newLog)
          return res.status(200).json(status.user);
      } else {
        res.status(500).json(status.error);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });


  api.post("/psp/register", async (req, res) => {
    let data = req.body
    try {
      const status = await userCtrl.registerUser(data)
      if (status.ok) {
        res.status(200).json(status.user);
      } else {
        res.status(500).json(status.error);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });

  api.post("/login", async (req, res) => {
    try {
      let data = req.body
      const user = await User.findOne({ email: data.email });
      if (!user) return res.status(400).json({ status: "failed", message: "Invalid email or password" });
      if (user.password !== data.password) return res.status(400).json({ status: "failed", message: "Invalid email or password" });
      const token = jwt.sign({
        id: user._id,
        email: user.email,
        name: user.fullName,
        userType: user.userType,
        company: user.company,
        state: user.state
      }, "+Y9FYqpJxJGeRy9aj1NOCbmAPZt/IKqPuDBJNf+gbuuK7nXuC82UA1kKSQju+TiqxhQwYCJgPcBn0lIdkA4KDj9F++U14AeVeCn3sbxBxqsykd7UOXEMrwUN808Io1cr02V5n3jm9Z6vVGxxbfkjepQ63zF2M6U7IkTNW15wGnM6cST6uPHVZOL1tl0bcosh536JCdIE6VNsaWgFfNSEbKCncDeQ9GQlUwDgrgQbeNQRyFYVIAeJx2F5Fv69e5/oZk25hRZPUMrXfrxGiWdmUX71df39OCycsD4aNog4xz3o9bjT6tJIqqAX7mQK5Gjce5VpilqY+z0SZVeylc5E6Q==", { expiresIn: '24h' })
      res.json({ status: "success", user: user, token });
    } catch (error) {
      res.send(error);
    }
  });

  api.patch("/:id", async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    delete body.createdAt;
    let status = await userCtrl.updateUser(id, body)
    if (status.ok) {
      res.status(200).json(status.user);
    } else {
      res.status(500).json(status.error);
    }
  });
  api.patch("/funds/:id", async (req, res) => {
    let {id} = req.params
    let {amount} = req.body
    let status = await userCtrl.addFunds(id,amount)
    if (status.ok) {
      res.status(201).json(status.psp);
    } else {
      res.status(500).json(status.error);
    }
  });

  // Deleting One
  api.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let status = await userCtrl.deleteUser(id)
    if (status.ok) {
      res.status(200).json(status.message);
    } else {
      res.status(500).json(status.error);
    }
  });



  return api;
}
