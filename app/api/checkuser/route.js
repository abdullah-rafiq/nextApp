import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";


export const POST = async (req) => {
  try {
    const { email} = await req.json();

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
        /// we can send a password reset link to the user's email here or return a success message 
        return Response.json(
            { message: "User exists" },
            { status: 200 }  
        );
    

  } 
  catch (error) {
    console.error(error);
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
};