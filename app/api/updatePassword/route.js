import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req){

try{
    await connectDB();
    const { email , password}  = await req.json();

    const user =  await User.findOne({email});

    if(!user){

        return Response.json({message:"Wrong Email"},{status:401})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.passwordHash = hashedPassword;

    await user.save();

    return Response.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
}

catch(error)
{
    return Response.json(
        {message:error.message},{status:500}
    );
};

}