import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";


export const GET = async () => {
    
    try{
        await connectDB();

        const users= await User.find({role:"Student"}).select("-password")
        return Response.json(
        users, {status:200}
    );
    }

    catch(error)
    {
        return Response.json(
        {message:error.message},{status:500})
    }


}