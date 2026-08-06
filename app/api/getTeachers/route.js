import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";


export const GET = async () => {
    
    try{
        await connectDB();
        const teachers = await User.find({ role: "Teacher" }).select("-password");
    
        return Response.json(
        teachers,{status:200}
    );
    }

    catch(error){
        return Response.json({message:error.message},{status:500})
    }
    
}