import nodemailer from "nodemailer";


export async function sendOTP(email,code) {

    //make service of email

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD,
        },
});
    
    await transporter.sendMail({
        to:email,
        from:process.env.EMAIL_USER,
        subject:"Your OTP For Verification",
        html:`
        <h1>Your OTP is</h1>
        <p>Copy the code</p>
        <p>${code}</p>
        `
    })
}