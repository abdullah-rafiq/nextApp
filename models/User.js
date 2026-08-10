import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  role:{
    type: String,
    enum: ["Student", "Teacher", "Admin"],
    required:true,
  },
  
  attendance:{
    type:Number,
    required:false,
  },

  isVerified:{
    type:Boolean,
    default:false
  },

  verificationOTP: String,

  verificationOTPExpiry: Date,
  
  resetOTP: {
    type: String,
    default: null,
  },

  resetOTPExpiry: {
    type: Date,
    default: null,
  },
    date: {
    type: Date,
    default: Date.now,
  },

});

export default mongoose.models.User ||
  mongoose.model("User", userSchema);