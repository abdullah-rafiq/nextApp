import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
        unique: true,
    },
    
    description: {
      type: String,
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
    },

    status:{
            type:String,
            enum:["active","inactive"],
            default:"active",
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