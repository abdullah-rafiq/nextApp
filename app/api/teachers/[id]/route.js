import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function GET(req, { params }) {
  console.log("ID:", params.id);

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