import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { sendOTP } from"../../../lib/sendOTP"
import crypto from "crypto";

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
    const OTP = crypto.randomBytes(4).toString("hex");
    user.verificationOTP = OTP;
    user.verificationOTPExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendOTP(
      email,
      OTP
    )

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