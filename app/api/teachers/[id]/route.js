import { stat } from "fs";
import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { error } from "console";

export async function GET(req, { params }) {

  try {
    await connectDB();
    const { id } = await params;
    const user = await User.findById(id).select("-password");
      
    if (!user) {
    return Response.json(
      { message: "User not found" },
      { status: 404 }
  );
}
    return Response.json(user, { status: 200 });


  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(req,{params}) {
  try{
    await connectDB();                              
    const { id } = await params;
    const {name,email} = await req.json();
    
    const updateTeacher = await User.findByIdAndUpdate(
      id,{
        name,
        email,
      },
      {
        new:true,
      }
    ).select("-password");
    if(!updateTeacher){
      return Response.json(
        {message:"Teacher Not Found"},{status:200}
      )}
    
    return Response.json(
       updateTeacher,{status:200},
    )
  }
  catch{error}{
    return Response.json(
      {message:error.message},{ status:500}
    )
  }
  
}