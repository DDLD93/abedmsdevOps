const beneFiciaries = require("../model/beneficiary.model")
const User = require("../model/user.model")
module.exports = (express) => {
  api = express.Router();

  api.get("/", async (req, res) => {

    //Summary
    let beneTotal = await beneFiciaries.find().count()
    let userCount = await User.find().count()
    let benePaid = await beneFiciaries.find({ status: "paid" }).count()
    let beneVerified = await beneFiciaries.find({ status: "awaiting payment" }).count()
    let beneMale = await beneFiciaries.find({ gender: "Male" }).count()
    let beneFemale = await beneFiciaries.find({ gender: "Female" }).count()
    let single = await beneFiciaries.find({ maritalStatus: "single" }).count()
    let married = await beneFiciaries.find({ maritalStatus: "married" }).count()
    let widowed = await beneFiciaries.find({ maritalStatus: "widowed" }).count()
    let divorced = await beneFiciaries.find({ maritalStatus: "divorced" }).count()
    let state = await beneFiciaries.find().distinct('state')

    //geo politacal zones summary
    let northEast = await beneFiciaries.find({
      $or: [{ state: "adamawa" }, { state: "bauchi" }, { state: "borno" }, { state: "gombe" }, { state: "taraba" }, { state: "yobe" }]
    }).count()
    let northWest = await beneFiciaries.find({
      $or: [{ state: "jigawa" }, { state: "kaduna" }, { state: "kano" }, { state: "katsina" }, { state: "Kebbi" }, { state: "sokoto" }, { state: "zamfara" }]
    }).count()
    let northCentral = await beneFiciaries.find({
      $or: [{ state: "benue" }, { state: "kogi" }, { state: "kwara" }, { state: "nasarawa" }, { state: "niger" }, { state: "plateau" }, { state: "abuja" }]
    }).count()
    let southWest = await beneFiciaries.find({
      $or: [{ state: "ekiti" }, { state: "lagos" }, { state: "ogun" }, { state: "ondo" }, { state: "osun" }, { state: "oyo" },]
    }).count()
    let southEast = await beneFiciaries.find({
      $or: [{ state: "abia" }, { state: "anambra" }, { state: "ebonyi" }, { state: "enugu" }, { state: "imo" },]
    }).count()
    let southSouth = await beneFiciaries.find({
      $or: [{ state: "akwa-ibom" }, { state: "bayelsa" }, { state: "cross-river" }, { state: "delta" }, { state: "edo" }, { state: "rivers" }]
    }).count()


    let northEastPaid = await beneFiciaries.find({
      $or: [{ state: "adamawa" }, { state: "bauchi" }, { state: "borno" }, { state: "gombe" }, { state: "taraba" }, { state: "yobe" }]
    }, { status: "paid" }).count()
    let northWestPaid = await beneFiciaries.find({
      $or: [{ state: "jigawa" }, { state: "kaduna" }, { state: "kano" }, { state: "katsina" }, { state: "Kebbi" }, { state: "sokoto" }, { state: "zamfara" }]
    }, { status: "paid" }).count()
    let northCentralPaid = await beneFiciaries.find({
      $or: [{ state: "benue" }, { state: "kogi" }, { state: "kwara" }, { state: "nasarawa" }, { state: "niger" }, { state: "plateau" }, { state: "abuja" }]
    }, { status: "paid" }).count()
    let southWestPaid = await beneFiciaries.find({
      $or: [{ state: "ekiti" }, { state: "lagos" }, { state: "ogun" }, { state: "ondo" }, { state: "osun" }, { state: "oyo" },]
    }, { status: "paid" }).count()
    let southEastPaid = await beneFiciaries.find({
      $or: [{ state: "abia" }, { state: "anambra" }, { state: "ebonyi" }, { state: "enugu" }, { state: "imo" },]
    }, { status: "paid" }).count()
    let southSouthPaid = await beneFiciaries.find({
      $or: [{ state: "akwa-ibom" }, { state: "bayelsa" }, { state: "cross-river" }, { state: "delta" }, { state: "edo" }, { state: "rivers" }]
    }, { status: "paid" }).count()

    let stats = {
      total: beneTotal,
      paid: benePaid,
      verified: beneVerified,
      perTotal: Math.floor((100 / beneTotal) * benePaid),
      perVerified: (100 / beneTotal) * beneVerified,
      male: beneMale,
      female: beneFemale,
      state: state,
      userCount,
      zones: {
        northEast,
        northWest,
        northCentral,
        southWest,
        southEast,
        southSouth
      },
      maritalStatus: {
        single,
        married,
        widowed,
        divorced
      },
      zonesPaid: {
        northEastPaid,
        northWestPaid,
        northCentralPaid,
        southWestPaid,
        southEastPaid,
        southSouthPaid
      }

    }
    return res.status(200).json(stats);
  })
  api.get("/psp", async (req, res) => {
    let beneTotal = await beneFiciaries.find({ company: req.user.company }).count()
    let benePaid = await beneFiciaries.find({ company: req.user.company }, { status: "paid" }).count()
    let userCount = await User.find({ company: req.user.company }).count()


    let stats = {
      beneTotal,
      userCount,
      benePaid
    }

    return res.status(200).json(stats);
  })
  return api
}