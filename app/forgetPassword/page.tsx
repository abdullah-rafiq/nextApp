"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Registration() {

  const titles = {
  email: "Reset Password",
  otp: "Verify OTP",
  password: "Reset Password",
  };
  function handleGoLogin(){

    router.push("/login")
  }
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [step,setStep] = useState("email"); 
  
  
  
  async function handleCheckOTP() {
      const response = await fetch("api/verifyOTP",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({email,otp}),
      });
      const data = await response.json();

      if(response.ok){
        setStep("password");
      }
      else{
        console.log(data);
      }
    //TODO: Implement OTP verification logic here
  }
  
  async function handleUdpatePassword() {

    
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
          setStep("otp");
      }   else {
          console.log(data);
      }
    }

  return (
    <div className="page">
      <main className="registration-form">
        <h1 className="title">{step ==="email" ? "Reset Password":step==="otp" ? "Verify OTP":"Reset Password"}</h1>

  <form className="form">
      { step==="email" ? (
         <div>
          <label>Email</label>
          <input className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"/>
        </div>
       ) :step==="otp"?
        ( <div>
          <label>Enter OTP</label>
          <input className="input-field"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"/>
        </div>
        ):(
        <div>
        <div>
          <label>Enter Password</label>
          <input className="input-field"
            type="password"
            placeholder="Enter Password"/>
        
        </div>
        <div>
          <input className="input-field"
            type="password"
            placeholder="Confirm Password"/>
        </div>
        </div>
        )
        }
      
  </form>
  
  { step==="email" ? 
    (
    <button className="button" type="button" onClick={handleCheckEmail}>
      Reset Password
      </button>
    )
  :step==="opt"?
    ( 
    <button className="button" type="button" onClick={handleCheckOTP}>
    Verify OTP
      </button>):
    (
    <button className="button" type="button" onClick={handleUdpatePassword}>
      Update Password
      </button>)
  }

  {showOTP ? null :(

     <button className="button" type="button" onClick={handleGoLogin}>
      Login
      </button>)
  }

  
    </main>
      </div>
  );
}