import { connectDB } from "../../../lib/mongodb";


import User from "../../../models/User"


export async function POST (req){


    try{

        await connectDB();
        const {email,OTP}= await req.json();

        const user = await User.findOne({email});

        if(!user){
            return Response.json({
                message:"First Register Yourself"
            },{status:400})
        }

        if(user.verificationOTPExpiry < Date.now()){
            return Response.json({messaeg:"Expired OTP"},{status:400})

        }
        
        if(user.verificationOTP==OTP){
        user.isverified=true
        user.verificationOTPExpiry=null;
        user.verificationOTP=null;
        }
        await user.save();
        return Response.redirect(`${process.env.NEXT_PUBLIC_URL}/login`)

    }
    catch(error){
        return Response.json({message:error.message},{status:400})
    }
}