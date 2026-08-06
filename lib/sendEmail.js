import nodemailer from "nodemailer";
import { server } from "typescript";

export async function sendverificationemail(email,toke){

    const transporter = nodemailer.createTransport(
        {
            service:"gemail",
        
            auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD,}
        }
    );

    const link =
    `${process.env.NEXT_PUBLIC_URL}/api/verify-email?token=${token}`;

    await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your account",

    html: `
      <h2>Welcome</h2>

      <p>Please verify your email:</p>

      <a href="${link}">
        Verify Email
      </a>
    `
  });


}