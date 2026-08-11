import { connectDB } from "../../../lib/mongodb"
import  Course from "../../../models/courses"

//for adding coures
export async function POST(req) {

    try{
        await connectDB();
        const {name, code, title, creditHours, semester, program, department, status, prerequisites} = await req.json();
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

         await newCourse.save();

         return Response.json({message:"Success"},{status:200}
         )
    }
    catch(error){
        return Response.json({message:error.message},{status:500})
    };
    
    
}

export async function PUT(req, { params }) {
   
    try{
        await connectDB();
         const {
            id,
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
        const course = await Course.findByIdAndUpdate(id);
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


export async function GET(req, { params }) {
    try{
       
        await connectDB();
        const { id } = await params;

        if (id) {
            const course = await Course.findById(id);

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

export async function Delete(req) {
    
}