import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
export const POST = async (req) => {
    
    try{
        const { email, password } = await req.json();

        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            return Response.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return Response.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        return Response.json(
            { message: "Login successful" },
            { status: 200 }
        );
    }

    catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }

}