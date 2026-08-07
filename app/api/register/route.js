import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail } from "../../../lib/sendEmail";

export const POST = async (req) => {
  try {
    const { name, email, password, role } = await req.json();

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const code = crypto.randomBytes(3).toString("hex");

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      isVerified:false,
      verificationOTP,
      verificationOTPExpiry:Date.now() + 10 * 60 * 1000
    });

    await newUser.save();

    await sendVerificationEmail(
      email,
      verificationOTP
    );


    return Response.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
};