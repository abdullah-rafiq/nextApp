import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return Response.json({ message: "Email and OTP are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({ message: "First Register Yourself" }, { status: 400 });
    }
    
    if (user.verificationOTPExpiry < Date.now()) {
      return Response.json({ message: "Expired OTP" }, { status: 400 });
    }

    if (user.resetOTP === otp) {
      user.isVerified = true;
      user.resetOTPExpiry = null;
      user.resetOTP = null;
      await user.save();
      return Response.json({ message: "Verified" }, { status: 200 });
    }

    return Response.json({ message: "Invalid OTP" }, { status: 400 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}