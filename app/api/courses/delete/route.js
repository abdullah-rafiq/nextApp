import { json } from "stream/consumers";
import { connectDB } from "../../../lib/mongodb"
import  Course from "../../../models/courses"

export async function DELETE(rea,{params}) {

    try{
        await connectDB();
        const {id}= await req.json();
        const course = Course.findById(id);
        const result = await Course.deleteMany({
        _id: { $in: ids }
        });
        return Response,json({message:"Success"},{status:200})
    }

    catch(error){
        return Response.json(
            {message:error.message},{status:500}

        )
    };
    
    
}