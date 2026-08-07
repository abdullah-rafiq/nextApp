import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendOTP } from "../../../lib/sendOTP";

export const POST = async (req) => {

    try{
        const {name, email, role} = await req.json();

        await connectDB();

        const existingUser =  await User.findOne({email});
        if(existingUser){
            return Response.json({message:"User Already Exists"},{status:400})
        }

        const randomPasswordg = crypto.randomBytes(12).toString("hex");
        const hashedPassword = await bcrypt.hash(randomPasswordg, 10);

        const newUser = new User({
            name:name,
            email:email,
            role:role,
            password:hashedPassword,
            isVerified:true,
        })

        await newUser.save();

        await sendCredientals(
            email,
            password,
        )

        return Response.json(
        { message: "User created successfully" },
        { status: 201 }
    );
    }
    catch(error){
        return Response.json({message:error.message},{status:400})
    }
    
}