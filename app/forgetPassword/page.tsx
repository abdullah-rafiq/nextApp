"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Registration() {

  
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  
  function handleCheckOTP() {

    //TODO: Implement OTP verification logic here
  }
  

  async function handleCheckEmail(){   
    const response = await fetch("/api/checkuser",{

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();

      if  (response.ok) {
       // router.push("/verifyotp");
      //window.location.href = "/login";
          setShowOTP(true);
      }   else {
          console.log(data);
      }
    }
   // Later we will save user data her}e
  return (
    <div className="page">
<main className="registration-form">
  <h1 className="title">{showOTP ? "Verify OTP" : "Reset Password"}</h1>

  <form className="form">
      { !showOTP ? (
         <div>
          <label>Email</label>
          <input className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"/>
        </div>
       ) :
        ( <div>
          <label>Enter OTP</label>
          <input className="input-field"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"/>
        </div>
        )}
      
  </form>
  
    { showOTP ? 
    
    ( 
    <button className="button" type="button" onClick={handleCheckOTP}>
    Verify OTP
      </button>
  ):
    (
    <button className="button" type="button" onClick={handleCheckEmail}>
      Reset Password
      </button>)
  }
    </main>
      </div>
  );
}
