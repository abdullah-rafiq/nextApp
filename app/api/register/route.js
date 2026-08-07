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
    console.log("OTP code:", code);

    const newUser = new User({
      name:name,
      email:email,
      password: hashedPassword,
      role:role,
      isVerified:false,
      verificationOTP:code,
      verificationOTPExpiry:Date.now() + 10 * 60 * 1000
    });

    await newUser.save();

    await sendVerificationEmail(
      email,
      code
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