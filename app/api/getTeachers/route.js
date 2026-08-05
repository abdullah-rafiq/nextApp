import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";


export const POST = async (req) => {
    
    try{
        await connectDB();
    const teachers = await User.find({ role: "Teacher" })
      .select("-password");
    
    
      return Response.json(
        teachers
    );
    }

    catch(error){

        return Response.json({message:error.message},{status:500})
    }
    
}