const Beneficiary = require("../model/beneficiary.model")

class BeneficiariesController{
    constructor(){}
  
async getBeneficiariesCustom(batch,state,lga){
    try {
      const bene = await Beneficiary.find();
      return {ok:true, bene};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async getBeneficiariesPaypoint(id){
    try {
      const bene = await Beneficiary.find({pspId:id,status: { $not: { $eq: "uploaded" } }, });
      return {ok:true, bene};
    } catch (err) {
      console.log(err)
      return {ok:false,error:err};
    }
  }
  async getBeneficiariesByState(state){
    try {
      const bene = await Beneficiary.find({state:state,status: { $not: { $eq: "uploaded" } }, });
      return {ok:true, bene};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async getLGA(state){
    try {
      let lgaList = await Beneficiary.find({state}).distinct('lga')
      return {ok:true, lgaList};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async getWard(lga){
    try {
      let wardList = await Beneficiary.find({lga}).distinct('ward')
      return {ok:true, wardList};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async getCount(ward){
    try {
      let count = await Beneficiary.find({ward}).count()
      console.log("count >>>>>", count)
      return {ok:true, count};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async assignPSP(data,id){
    try {
      let count = await Beneficiary.updateMany({$or:data},{
        $set:{
          pspId:id
        }
      })
      return {ok:true, count};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async processed(data,id){
    try {
      let count = await Beneficiary.updateMany({_id:id},data)
      return {ok:true, count};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async deleteBeneficiaries(id){
    try {
      const bene = await Beneficiary.deleteMany({sheetId:id});
      return {ok:true, bene};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async addBeneficiaries(data){
    try {
      let newData = new Beneficiary(data)
      let message  = await newData.save()
      return {ok:true, message};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async addBiometric(id,thumbHash,faceHash){
    try {
      let message  = await Beneficiary.findByIdAndUpdate({_id:id},{
        $set:{
          isBioCaptured: true,
          biometric:{
            dateCapture: new Date.now(),
            faceHash: faceHash,
            thumbHash: thumbHash,
        },
        }
      },{new:true})
      return {ok:true, message};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async updateBio(id,data){
    data.updatedAt = Date.now()
    try {
      let bene  = await Beneficiary.findByIdAndUpdate(id, data, {multi:false, new:true});
      return {ok:true, bene};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
  async updateStatus(sheetid,status){
    try {
      let bene  = await Beneficiary.updateMany({sheetId:sheetid},{status:status,updatedAt:Date.now()},{multi:false, new:true});
      return {ok:true, bene};
    } catch (err) {
      return {ok:false,error:err};
    }
  }
}


module.exports = new BeneficiariesController()