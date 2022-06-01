const Paypoint = require("../model/paypiont.model");
const bcrypt = require("bcrypt");
 
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

  async addPaypoint(data){
    try {
      const newPaypoint = new Paypoint(data);
      const paypoint = await newPaypoint.save();
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