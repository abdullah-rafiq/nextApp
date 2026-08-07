import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendOTP } from "../../../lib/sendEmail";

export const POST = async (req) => {

    try{
        const {name, email, phone, cnic, gender, DOB,role} = await req.json();

        await connectDB();

        const existingUser =  await User.findOne({email});
        if(existingUser){
            return Response.json({message:"User Already Exists"},{status:400})
        }
        const randomPasswordg = crypto.randomBytes(12).toString("hex");
        const hashedPassword = await bcrypt.hash(randomPasswordg, 10);
        const radnomOTP = Math.floor(Math.random() * 900000) + 100000;

        const newUser = new User({
            name,
            email,
            phone,
            role:role,
            cnic,
            gender,
            DOB,
            password:hashedPassword,
            isVerified:false,
            verificationOTP:radnomOTP,
            verificationOTPExpiry:Date.now() + 10 * 60 * 1000
        })

        await newUser.save();

        await sendOTP(
            email,
            radnomOTP,
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