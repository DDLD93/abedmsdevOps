const User = require("../model/user.model");
const {mailer, welcomeMsg} = require("../controller/mailer")
const uuid = require("uuid").v4
 
class UserController{
  constructor(){}

  async getUsers(){
    try {
      const users = await User.find();
      return {ok:true, users};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async getPspUsers(){
    try {
      const users = await User.find({userType:"psp"});
      return {ok:true, users};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async getUsersByCompany(cpy){
    try {
      const users = await User.find({company:cpy});
      return {ok:true, users};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  async getUser(id){
    try {
      const user = await User.findById(id);
      return {ok:true, user};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  async addUser(data, imagePath){
    try {
      data.image = imagePath;
      const newUser = new User(data);
      const user = await newUser.save();
      return {ok:true, user};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
 
  async registerUser(data){
    try {
      const newUser = new User(data);
      const password = uuid().split("-")[0]
      newUser.password = password
      const user = await newUser.save();
      let response = await welcomeMsg(user.email,user.fullName,user.password,'ddld.info')
      return {ok:true, user};

    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async updateUser(id,newData){
    try {
      const updatedUser = await User.findByIdAndUpdate(id, newData, {multi:false, new:true});
      return {ok:true, user:updatedUser};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async addFunds(id,amount){
    let inc = parseInt(amount)
    try {
    let psp = await User.findByIdAndUpdate(id,{
      pspInfo:{
        $inc:{
          disbursment: inc
        }
          }
  },{ new: true })
  

      return {ok:true, psp};
    } catch (err) {
      console.log(err)
      return {ok:false,error:err};
    }
  }

  async deleteUser(id){
    try {
      await User.findByIdAndDelete(id);
      return {ok:true, message: "Deleted User" };
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  

}

module.exports = new UserController();