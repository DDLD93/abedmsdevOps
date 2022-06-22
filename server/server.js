const UPLOADS = __dirname+'/uploads';
const PHOTO_ID = __dirname+'/photoID';
const PAYMENT = __dirname+'/payment';
require('./connection/mongodb.connection')();
const https = require('https')
const http = require('http');
const fs = require('fs')
const path = require('path');

const express = require("express");

const cors = require('cors');
require('dotenv').config();
// const httpsOptions = {
//     key: fs.readFileSync('./cert/privkey.pem'),
//     cert: fs.readFileSync('./cert/cert.pem')
//   }
// const broker = require("./connection/rabbitmq.connection")




const app = express()
const port = process.env.PORT || 9000


app.use(cors());
app.use(express.urlencoded({ extended: true }));
//intitializing body parser
app.use(express.json({limit: '50mb'}))
// connecting to databas

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// app.use(express.static(path.join(__dirname, 'buildtwo')));
// app.get('/terminal', function (req, res) {
//   res.sendFile(path.join(__dirname, 'buildtwo', 'index.html'));
// });

app.use("/api/batch", require("./routes/batch.route")(express,UPLOADS));
app.use("/api/psp", require("./routes/psp.route")(express,UPLOADS));

app.use("/api/sheet", require("./routes/sheet.route")(express,UPLOADS));
app.use("/api/user", require("./routes/user.route")(express));
app.use("/api/beneficiaries", require("./routes/beneficiaries.route")(express,PHOTO_ID));
app.use("/api/payment", require("./routes/payment.route")(express,PAYMENT));
app.use("/api/analytics", require("./routes/analytics.route")(express));
app.use("/api/logs", require("./routes/logs.route")(express));
app.use("/api/paypoint", require("./routes/paypoint.route")(express));
app.use("/api/uploads",express.static(UPLOADS))
app.use("/api/photoID",express.static(PHOTO_ID))
app.use(function(req, res, next){
  res.status(404).sendFile(path.join(__dirname, 'build', 'index.html'));
});

//setInterval(()=>broker.sendMsg({name:"umar"}),10000)

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
  });


