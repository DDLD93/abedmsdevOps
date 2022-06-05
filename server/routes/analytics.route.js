const beneFiciaries =  require("../model/beneficiary.model")
const User = require("../model/user.model")
module.exports = (express) => {
    api = express.Router();

    api.get("/", async (req, res) => {
        console.log("am hiit analytics")
         let beneTotal = await beneFiciaries.find().count()
         let userCount = await User.find().count()
         let benePaid = await beneFiciaries.find({status:"paid"}).count()
         let beneVerified = await beneFiciaries.find({status:"awaiting payment"}).count()
         let beneMale = await beneFiciaries.find({gender:"Male"}).count()
         let beneFemale = await beneFiciaries.find({gender:"Female"}).count()
         let state = await beneFiciaries.find().distinct('state')
         let northEast = await beneFiciaries.find({
          $or: [{state:"adamawa"},{state:"bauchi"},{state:"borno"},{state:"gombe"},{state:"taraba"},{state:"yobe"}]
        }).count()
        let northWest = await beneFiciaries.find({
          $or: [{state:"jigawa"},{state:"kaduna"},{state:"kano"},{state:"katsina"},{state:"Kebbi"},{state:"sokoto"},{state:"abuja"}]
        }).count()
        let northCentral = await beneFiciaries.find({
          $or: [{state:"benue"},{state:"kogi"},{state:"kwara"},{state:"nasarawa"},{state:"niger"},{state:"plateau"},{state:"zamfara"}]
        }).count()
         let stats = {
           total: beneTotal,
           paid: benePaid,
           verified: beneVerified,
           perTotal: Math.floor((100/beneTotal)*benePaid) ,
           perVerified: (100/beneTotal)*beneVerified,
           male:beneMale,
           female:beneFemale,
           state:state,
           userCount,
           zones:{
            northEast,
            northWest,
            northCentral
           }
       
         }
       return res.status(200).json(stats);
  })  
  api.get("/psp", async (req, res) => {
    console.log("am hiit analytics")
     let beneTotal = await beneFiciaries.find({company:req.user.company}).count()
     let benePaid = await beneFiciaries.find({company:req.user.company},{status:"paid"}).count()
     let userCount = await User.find({company:req.user.company}).count()


     let stats = {
      beneTotal,
      userCount,
      benePaid
     }
    
    return res.status(200).json(stats);
})  
return api
}