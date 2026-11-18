import mongoose from "mongoose";
const schema=new mongoose.Schema({actor:{type:mongoose.Schema.Types.ObjectId,ref:"User",default:null},actorEmail:String,action:{type:String,required:true,index:true},resource:String,resourceId:String,details:{type:mongoose.Schema.Types.Mixed,default:{}},ip:String,userAgent:String},{timestamps:true});
schema.index({createdAt:-1});
export default mongoose.model("AuditLog",schema);