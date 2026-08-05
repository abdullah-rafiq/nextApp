import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

//jwt
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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

        //token generation

        const token= jwt.sign(

            {
                id:user_id,
                email:user_email,
            },
            
            process.env.JWT_SECRET,
            {

                expiresIn:'id',
            }
        );



        //saving jwt to cookies


        const cookies = await cookieStore();
        
        cookies.set("token",token,{

            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day


        });











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