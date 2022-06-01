const beneFiciaries =  require("../model/beneficiary.model")
module.exports = (express) => {
    api = express.Router();

    api.get("/", async (req, res) => {
        console.log("am hiit analytics")
         let beneTotal = await beneFiciaries.find().count()
         let benePaid = await beneFiciaries.find({status:"paid"}).count()
         let beneVerified = await beneFiciaries.find({status:"awaiting payment"}).count()
         let beneMale = await beneFiciaries.find({gender:"Male"}).count()
         let beneFemale = await beneFiciaries.find({gender:"Female"}).count()
         let state = await beneFiciaries.find().distinct('state')

         let stats = {
           total: beneTotal,
           paid: benePaid,
           verified: beneVerified,
           perTotal: (beneTotal/100)*benePaid,
           perVerified: (beneTotal/100)*beneVerified,
           male:beneMale,
           female:beneFemale,
          state:state
       
         }
       return res.status(200).json(stats);

  })  
return api
}