const Sheet = require("../model/sheet.model")
class SheetController{
    constructor(){}

    async addSheet(data={}){
        try {
          const newSheet = new Sheet(data);
          const sheet = await newSheet.save();
          return {ok:true, sheet};
        } catch (err) {
          return {ok:false,error:err};
        }
      }
      async getSheets(){
        try {
          const sheets = await Sheet.find()
          return {ok:true, sheets};
        } catch (err) {
          return {ok:false,error:err};
        }
      }

      async deleteSheet(id){
        try {
          const sheets = await Sheet.findByIdAndDelete(id)
          return {ok:true, sheets};
        } catch (err) {
          return {ok:false,error:err};
        }
      }
      async updateSheet(id,data){
        try {
          const sheets = await Sheet.findByIdAndUpdate(id, data, {new:true})
          return {ok:true, sheets};
        } catch (err) {
          return {ok:false,error:err};
        }
      }
    
}
module.exports = new SheetController()