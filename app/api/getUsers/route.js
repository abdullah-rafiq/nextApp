import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";


export const POST = async (req) => {
    
    try{
        await connectDB();

        const users= await user.find({role:"Student"}).select("-password")
        return Response.json(
        users
    );
    }

    catch(error)
    {
        return Response.json(
        {message:error.message},{staus:500})
    }


}