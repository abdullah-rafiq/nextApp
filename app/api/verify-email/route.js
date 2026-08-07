import {connectDB} from "../../../lib/mongodb"
import User from "../../../models/User"


export async function GET (req){

    try{
        await connectDB();

        const {lookToken} = new URL(req.url);
        const token = lookToken.get("token");

        const user = await User.findOne({verificationToken:token});

        if(!user){
            return Response.json({messaeg:"Invalid Token"},{status:400})
        }

        if(user.verificationTokenExpiry < Date.now()){
            return Response.json({messaeg:"Expired Token"},{status:400})

        }

        user.isVerified=true;
        user.verificationToken=null;
        user.verificationTokenExpiry=null;

        await user.save();
        return Response.redirect(`${process.env.NEXT_PUBLIC_URL}/login`)
    }

    catch(error)
    {
        return Response.json({message:error.message},{status:500})
    }
}