const express = require("express");
const cors = require('cors');
const path = require('path');
const https = require('https')
const fs = require('fs')

const app = express()
const port = 5000
app.use(cors());
// const httpsOptions = {
//     key: fs.readFileSync('./certs/key.pem'),
//     cert: fs.readFileSync('./certs/cert.pem')
//   }

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, 'build', 'index.html'));
});

 app.listen(port,()=>console.log(`server running on port ${port}`));