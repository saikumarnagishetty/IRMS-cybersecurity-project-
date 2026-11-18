import mongoose from "mongoose";
const schema = new mongoose.Schema({
 incidentId:{type:String,unique:true,index:true},
 title:{type:String,required:true,trim:true,maxlength:160},
 description:{type:String,required:true,maxlength:5000},
 category:{type:String,enum:["Security Breach","Data Breach","Malware Attack","Phishing Attack","Ransomware Attack","Network Issue","System Failure","Unauthorized Access","Denial of Service","Other"],default:"Other"},
 priority:{type:String,enum:["Critical","High","Medium","Low"],default:"Medium"},
 severity:{type:String,enum:["Critical","High","Medium","Low"],default:"Medium"},
 status:{type:String,enum:["Open","Under Investigation","In Progress","Contained","Resolved","Closed"],default:"Open"},
 reportedBy:String,assignedTo:{type:String,default:"Unassigned"},affectedSystem:String,affectedDepartment:String,location:String,dueAt:Date,resolvedAt:Date,
 notes:[{body:String,author:String,createdAt:{type:Date,default:Date.now}}]
},{timestamps:true});
schema.pre("validate",async function(){if(!this.incidentId){const last=await mongoose.model("Incident").findOne({},{incidentId:1}).sort({createdAt:-1});const n=last?.incidentId?Number(last.incidentId.split("-")[1])+1:1;this.incidentId="INC-"+String(n).padStart(3,"0");}});
export default mongoose.model("Incident",schema);