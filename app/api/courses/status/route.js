import { connectDB } from "../../../../lib/mongodb"
import courses from "../../../../models/courses";

export async function PATCH(req,{params}){

    try{
        await connectDB();
        const {ids,status} = await req.json(); 
        
        await courses.updateMany(
            { _id:{#in:ids}},
            { #set:{status:status} }
        )

        return Response.json({message:"Success"},{status:200})

    }
    catch(error){
        return Response.json({message:error.message},{status:500})
    };
    

}