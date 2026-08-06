import { userAgentFromString } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";


export const GET = async() => {

    try{

        await connectDB();
        const studentCount = await User.countDocuments({
      role: "Student",});

      return Response.json(
        {count:studentCount},{status:200})

    }
    
    catch(error)
    
    {
        return Response.json(
        {message:error.message},{status:500})
    }

} 