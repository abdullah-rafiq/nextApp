import nodemailer from "nodemailer";

export async function sendVerificationEmail(email, code) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP",
    html: `
      <h2>Welcome</h2>
      <p>Your OTP is${code}</p>
      <p>It will expire in 10 mintues</p>
    `,
  });

}