import { connectDB } from "../../../lib/mongodb"
import  Course from "../../../models/courses"

//for adding coures
export async function POST(req) {

    try{
        await connectDB();
        const {name, code, title, creditHours, semster, program, department, status, prerequisites} = await req.json();
        const newCourse = new Course({
            name:name,
            title:title,
            code:code,
            status:status,
            creditHours:creditHours,
            semester:semester,
            program:program,
            department:department,
            prerequisites: prerequisites,
         })

         await Course.save();

         return Response.json({message:"Success"},{status:200}
         )
    }
    catch(error){
        return Response.json({message:error.message},{status:500})
    };
    
    
}

export async function PUT(req) {
    try{
        await connectDB();
        const [name, code, title, creditHours,grade, teacher]=await req.json;}

    catch(error){
        return Response.json({message:error.message},{status:500})
    };
    
}


export async function GET(req) {
    try{
        await connectDB();
        const [name, code, title, creditHours,grade, teacher]=await req.json;}

    catch(error){
        return Response.json({message:error.message},{status:500})
    };
    
}

export async function Delete(req) {
    
}