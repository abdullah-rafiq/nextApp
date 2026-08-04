"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Registration() {

  const router = useRouter();
  const [email, setEmail] = useState("");
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
        router.push("/verifyotp");
      //window.location.href = "/login";
      }   else {
        console.log(data);
      }
    }
   // Later we will save user data her}e
  return (
    <div className="page">
<main className="registration-form">
  <h1 className="title">Reset Password</h1>

  <form className="form">

         <div>
          <label>Email</label>
          <input className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"/>
        </div>
  </form>

  <button className="button" type="button" onClick={handleCheckEmail}>
    Reset Password
  </button>
  </main>
        </div>
  );
}
