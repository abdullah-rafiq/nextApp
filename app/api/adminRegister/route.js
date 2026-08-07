import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import user from "../../../models/User"
import bcrypt from "bcryptjs";


export const POST = async (req) => {

    try{
        const [name, email, phone, cninc, gender, DOB,] = await req.json();

        await connectDB();

        const existingUser =  await User.findOne({email});
        if(existingUser){
            return Response.json({message:"User Already Exists"},{status:400})
        }
        const randomPasswordg = crypto.randomBytes(12);
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        const radnomOTP = crypto.randomBytes(6);

        const newUser = new User({
            name,
            email,
            phone,
            role,
            cnic,
            gender,
            DOB,
            password:randomPasswordg,
            isVerified:false,
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