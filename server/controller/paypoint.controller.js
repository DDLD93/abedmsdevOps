const Paypoint = require("../model/paypiont.model");
const BeneFiciaries = require("../model/beneficiary.model")
const {mailer} = require("../controller/mailer")
const uuid = require("uuid").v4
 
class UserController{
  constructor(){}

  async getPaypoints(){
    try {
      const paypoint = await Paypoint.find();
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
      newUser.password = password
      const paypoint = await newPaypoint.save();
      mailer.sendMail({
        from: `umar.jere@gmail.com`, // sender address
        to: `${user.email}`,
        subject: "Welcome to ABEDMS portal", // Subject line
        html: `<p>hello ${user.fullName} , Welcome to ABEDMS portal</p> </br> 
        <p><span>USERNAME: ${user.email}</span></br><span>password: ${user.password}</span></p>
        <p>Login at: https://paypoint.ddld.info</p>
        `, // plain text body
       },(err,resp)=>{
        if (err) {
              console.log("error >>>>>>", err)
           }
           console.log("mail response", resp)
       })
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