"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function VerifyOTP() {

  const router = useRouter();
  const [otp, setOtp] = useState("");

    async function handleVerifyOTP(){}

    return (
      <div className="page">
        <main className="registration-form">
          <h1 className="title">Verify OTP</h1>
          <form className="form">
            <div>
              <label>OTP</label>
              <input
                className="input-field"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter your OTP"
              />
            </div>
          </form>
          <button className="button" type="button" onClick={handleVerifyOTP}>
            Verify OTP
          </button>
        </main>
      </div>
    );
  };