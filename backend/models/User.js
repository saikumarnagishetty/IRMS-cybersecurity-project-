import mongoose from "mongoose";
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true,maxlength:100},email:{type:String,required:true,unique:true,lowercase:true,trim:true},passwordHash:{type:String,required:true,select:false},role:{type:String,enum:["Admin","Incident Manager","Analyst","Responder","Viewer"],default:"Analyst"},team:{type:mongoose.Schema.Types.ObjectId,ref:"Team",default:null},active:{type:Boolean,default:true},tokenVersion:{type:Number,default:0},lastLoginAt:Date},{timestamps:true});
export default mongoose.model("User",schema);
