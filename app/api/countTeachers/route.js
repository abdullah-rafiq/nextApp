import { userAgentFromString } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";


export const GET = async() => {

    try{

        await connectDB();
        const teacherCount = await User.countDocuments({
      role: "Teacher",});

      return Response.json(
        {count:teacherCount},{status:200})

    }
    
    catch(error)
    
    {
        return Response.json(
        {message:error.message},{status:500})
    }

} 