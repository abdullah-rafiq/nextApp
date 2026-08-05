import mongoose from "mongoose";

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

  password: {
    type: String,
    required: true,
  },

  role:{
    type: String,
    enum: ["Student", "Teacher", "Admin"],
    required:true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

});

export default mongoose.models.User ||
  mongoose.model("User", userSchema);