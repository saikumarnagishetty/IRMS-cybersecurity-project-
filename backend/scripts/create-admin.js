import "dotenv/config";
import mongoose from "mongoose";import bcrypt from "bcryptjs";import User from "../models/User.js";
const [name,email,password]=process.argv.slice(2);
if(!name||!email||!password||password.length<12){console.error('Usage: npm run create-admin -- "Admin Name" admin@example.com "LongPassword12!" (minimum 12 chars)');process.exit(1);}
await mongoose.connect(process.env.MONGODB_URI);
const passwordHash=await bcrypt.hash(password,12);
await User.updateOne({email:email.toLowerCase()},{ $set:{name,email:email.toLowerCase(),passwordHash,role:"Admin",active:true}},{upsert:true});
console.log("Administrator provisioned:",email);await mongoose.disconnect();