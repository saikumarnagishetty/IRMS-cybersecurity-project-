import mongoose from "mongoose";
const schema=new mongoose.Schema({name:{type:String,required:true,unique:true,trim:true},description:{type:String,default:""},lead:{type:mongoose.Schema.Types.ObjectId,ref:"User",default:null},members:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]},{timestamps:true});
export default mongoose.model("Team",schema);