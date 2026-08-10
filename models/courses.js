import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
        unique: true,
    },
    
    description: {
      type: String,
      required: true,
    },

    code: {
        type: String,
        required: true,
        unique:true,
    },

    creditHours:{
        type: Number,
        required: true,
    },
    department:{
        type:String,
        required:true,
    },
    program:{
        type:String,
        required:true,
    },
    semester:{
        type:Number,
        required:true,
    },
    prerequisites:{
        type:String,
        required:true,
    },

    status:{
            type:Boolean,
            default:true,
    },

    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at:{
        type: Date,

    }

});

export default mongoose.models.courses ||
  mongoose.model("Course", coursesSchema);