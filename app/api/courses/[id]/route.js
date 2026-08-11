import { connectDB } from "../../../../lib/mongodb";
import Course from "../../../../models/courses";

export async function PUT(req, { params }) {
   
    try{
        await connectDB();
         const {
            title,
            code,
            department,
            program,
            creditHours,
            semester,
            status
    } = await req.json();
    
    const { id } = await params;
    
    
    if(id){
        
        const course = await Course.findByIdAndUpdate(id, {
            title,
            code,
            department,
            program,
            creditHours,
            semester,
            status
        }, { new: true });

        if (!course) {
            return Response.json(
                { message: "Course not found" },
                { status: 404 }
                );
            }
        return Response.json(course, { status: 200 });    
    }
    
    }
    catch(error){
        return Response.json({message:error.message},{status:500})
    };
    
}

export async function GET(req,{params}) {
    try{       
        await connectDB();
        const { id } = await params;
        const course = await Course.findById(id);

        return Response.json(course,{status:200});
    }
    catch(error){
        return Response.json({message:error.message},{status:500})
    };
    
}