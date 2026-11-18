import mongoose from "mongoose";
const schema=new mongoose.Schema({recipient:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,index:true},title:{type:String,required:true},message:{type:String,required:true},type:{type:String,enum:["info","warning","critical","success"],default:"info"},link:String,readAt:Date},{timestamps:true});
export default mongoose.model("Notification",schema);