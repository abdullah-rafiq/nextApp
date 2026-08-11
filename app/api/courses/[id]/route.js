
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



export async function GET(req,{params}) {
    try{
       
        await connectDB();
        const { id } = await params;

        const course = await Course.findbyId(id);

        return Response.json({message:course},{status:200});
    }
    catch(error){
        return Response.json({message:error.message},{status:500})
    };
    
}