const jwt = require("jsonwebtoken");

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
        jwt.verify(token,"+Y9FYqpJxJGeRy9aj1NOCbmAPZt/IKqPuDBJNf+gbuuK7nXuC82UA1kKSQju+TiqxhQwYCJgPcBn0lIdkA4KDj9F++U14AeVeCn3sbxBxqsykd7UOXEMrwUN808Io1cr02V5n3jm9Z6vVGxxbfkjepQ63zF2M6U7IkTNW15wGnM6cST6uPHVZOL1tl0bcosh536JCdIE6VNsaWgFfNSEbKCncDeQ9GQlUwDgrgQbeNQRyFYVIAeJx2F5Fv69e5/oZk25hRZPUMrXfrxGiWdmUX71df39OCycsD4aNog4xz3o9bjT6tJIqqAX7mQK5Gjce5VpilqY+z0SZVeylc5E6Q==",(err,response)=>{
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
        jwt.verify(token,"+Y9FYqpJxJGeRy9aj1NOCbmAPZt/IKqPuDBJNf+gbuuK7nXuC82UA1kKSQju+TiqxhQwYCJgPcBn0lIdkA4KDj9F++U14AeVeCn3sbxBxqsykd7UOXEMrwUN808Io1cr02V5n3jm9Z6vVGxxbfkjepQ63zF2M6U7IkTNW15wGnM6cST6uPHVZOL1tl0bcosh536JCdIE6VNsaWgFfNSEbKCncDeQ9GQlUwDgrgQbeNQRyFYVIAeJx2F5Fv69e5/oZk25hRZPUMrXfrxGiWdmUX71df39OCycsD4aNog4xz3o9bjT6tJIqqAX7mQK5Gjce5VpilqY+z0SZVeylc5E6Q==",(err,response)=>{
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