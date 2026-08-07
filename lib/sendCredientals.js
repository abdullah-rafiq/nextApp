import nodemailer from "nodemailer";

export async function sendCredientals(email, password) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const link =
    `${process.env.NEXT_PUBLIC_URL}login`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Login Info of your account",
    html: `
      <h2>Welcome</h2>
      <p>Please Login useing given credientals:</p>
      <p>Email ${email}</p>
      <p>Password ${password}</p>
      <a href = "${link}">
    `,
  });

}