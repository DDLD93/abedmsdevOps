const multer = require('multer');
const uuid = require('uuid').v4;
const paypointCtrl = require("../controller/paypoint.controller")
const Paypoint = require("../model/paypiont.model")
const bcrypt = require("bcrypt")
const {Staff} = require("../middleware/auth.middleware")
const jwt = require("jsonwebtoken");





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
    let status = await paypointCtrl.getPaypoints();
    if (status.ok) {
      if (status.paypoint) return res.status(200).json(status.paypoint);
      res.status(200).json([]);
    } else {
      res.status(500).json(status.error);
    }
  });
  api.get("/dashboard",Staff, async (req, res) => {
    let status = await paypointCtrl.getDashboard(req.user.id);
    if (status.ok) {
      if (status.response) return res.status(200).json(status.response);
      res.status(200).json([]);
    } else {
      res.status(500).json(status.error);
    }
  });
  // api.get("/bypsp", async (req, res) => {
  //   let company = req.user.company
  //   let status = await userCtrl.getUsersByCompany(company);
  //   if (status.ok) {
  //     if (status.users) return res.status(200).json(status.users);
  //     res.status(200).json([]);
  //   } else {
  //     res.status(500).json(status.error);
  //   }
  // });

  api.get("/:id", async (req, res) => {
    let { id } = req.params;
    let status = await paypointCtrl.getPaypoint(id);
    if (status.ok) {
      if (status.paypoint) return res.status(200).json(status.paypoint);
      res.status(200).json({});
    } else {
      res.status(500).json(status.error);
    }
  });


  api.post("/register", async (req, res) => {
    let data = req.body
    // bcrypt.hash(data)
    try {
      // data.password = await bcrypt.hash(data.password, 10,)
      const status = await paypointCtrl.addPaypoint(data)
      if (status.ok) {
        if (status.paypoint) {
          return res.status(200).json(status.paypoint);
        }

      } else {
        res.status(500).json(status.error);
      }

    } catch (error) {
      res.status(500).json(error);
    }
  });

  api.post("/login", async (req, res) => {
    try {
      let {email,password} = req.body
      const user = await Paypoint.findOne({email});
      console.log("paypoint login",user)
      if (!user) return res.status(400).json({ status: "failed", message: "Invalid email or password" });
      if (user.password !== password) return res.status(400).json({ status: "failed", message: "Invalid email or password" });
      const token = jwt.sign({
        id: user._id,
        email: user.email,
        name: user.fullName,
        userType: user.userType,
        company: user.company
      }, "+Y9FYqpJxJGeRy9aj1NOCbmAPZt/IKqPuDBJNf+gbuuK7nXuC82UA1kKSQju+TiqxhQwYCJgPcBn0lIdkA4KDj9F++U14AeVeCn3sbxBxqsykd7UOXEMrwUN808Io1cr02V5n3jm9Z6vVGxxbfkjepQ63zF2M6U7IkTNW15wGnM6cST6uPHVZOL1tl0bcosh536JCdIE6VNsaWgFfNSEbKCncDeQ9GQlUwDgrgQbeNQRyFYVIAeJx2F5Fv69e5/oZk25hRZPUMrXfrxGiWdmUX71df39OCycsD4aNog4xz3o9bjT6tJIqqAX7mQK5Gjce5VpilqY+z0SZVeylc5E6Q==", { expiresIn: '72h' })
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
