const jwt = require("jsonwebtoken");
const config = require("../config");

 function Admin (req, res, next) {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(403).send("Access denied.");

        const decoded = jwt.verify(token, "hfds6df49dmcv3surkd8rjdfc8fd0e3y");
        req.user = decoded;
        if (!decoded) return res.status(403).send("Access denied.");
        //if (decoded.userType != "admin") return res.status(403).send("Access denied.");
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};


async function Staff (req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader == 'undefined') return res.status(403).send("Access denied no token found");
        const token = bearerHeader.split(' ')[1]
        jwt.verify(token,config.keys.jwt,(err,response)=>{
            if(!err) {
                req.user = response
                console.log(response)
               // if (req.user.userType != "admin") return res.status(403).send("Access denied. invalid user type");
                next();
            }else{
                console.log(err)
            return res.status(403).send("Access denied. invalid token");
            }
        });
      }  ;
      async function Qa (req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader == 'undefined') return res.status(403).send("Access denied no token found");
        const token = bearerHeader.split(' ')[1]
        jwt.verify(token,config.keys.jwt,(err,response)=>{
            if(!err) {
                req.user = response
                console.log("Staff midileware>>>>>>> ",response)
               // if (req.user.userType != "admin") return res.status(403).send("Access denied. invalid user type");
                next();
            }else{
                console.log(err)
            return res.status(403).send("Access denied. invalid token");
            }
        });
      }  ;      
        
async function PSP (req, res, next) {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(403).send("Access denied.");
        const decoded = jwt.verify(token,"hfds6df49dmcv3surkd8rjdfc8fd0e3yhhhjkkkmmkl");
        req.user = decoded;
        if (!decoded) return res.status(403).send("Access denied.");
        //if (decoded.userType != "psp") return res.status(403).send("Access denied.");
        //console.log(req.user)
        next();
    } catch (error) {
        res.status(400).send("Invalid token")
    }
};

module.exports ={
    Admin,
    Qa,
    Staff,
    PSP
}