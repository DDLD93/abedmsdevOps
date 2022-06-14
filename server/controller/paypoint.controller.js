const Paypoint = require("../model/paypiont.model");
const BeneFiciaries = require("../model/beneficiary.model")
const {mailer} = require("../controller/mailer")
const uuid = require("uuid").v4
const {welcomeMsg,callToAction} = require("./mailer")
 
class UserController{
  constructor(){}

  async getPaypoints(company){
    console.log("paypoint list",company)
    try {
      const paypoint = await Paypoint.find({company});
      return {ok:true, paypoint};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
 

  async getPaypoint(id){
    try {
      const paypoint = await Paypoint.findById(id);
      return {ok:true, paypoint};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async getDashboard(id){
    console.log("user id >>>>>>", id)
    const wards = await BeneFiciaries.find({pspId:id,status: { $not: { $eq: "uploaded" } }, }).distinct('ward')
    try {
    //  async function counter(arr) {
    //     let promises =  arr.map(async(ward) =>{
    //        return{
    //         ward: ward,
    //         count:await BeneFiciaries.find({ward:ward}).count(),
    //         paid:await BeneFiciaries.find({ward:ward,status:"paid"}).count()
    //       }
    //     })
    //     return await Promise.all(promises)
    //   }
        
     // let result = counter(wards)
      // console.log(result)
      console.log("wards >>>>> ",wards)
      return {ok:true, wards};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  async addPaypoint(data){
    try {
      const newPaypoint = new Paypoint(data);
      const password = uuid().split("-")[0]
      newPaypoint.password = password
      const paypoint = await newPaypoint.save();
      await welcomeMsg(paypoint.email,paypoint.fullName,paypoint.password,'paypoint.ddld.info')
      return {ok:true, paypoint};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
 
  // async registerUser(data){
  //   try {
  //     const newUser = new User(data);
  //     const user = await newUser.save();
  //     return {ok:true, user};
  //   } catch (err) {
  //     return {ok:false,error:err};
  //   }
  // }
  async updateUser(id,newData){
    try {
      const updatedPaypoint = await Paypoint.findByIdAndUpdate(id, newData, {multi:false, new:true});
      return {ok:true, updatedPaypoint};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  async deleteUser(id){
    try {
      await Paypoint.findByIdAndDelete(id);
      return {ok:true, message: "Deleted User" };
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  

}

module.exports = new UserController();