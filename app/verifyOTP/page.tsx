"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function VerifyOTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [OTP, setOTP] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleOTPResend() {
    // Add resend OTP logic here later
  }

  async function handleVerifyOTP() {
    setErrorMsg("");

    const response = await fetch("/api/verifyOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, OTP }), // <-- email added back
    });

    const data = await response.json();

    if (response.ok) {
      router.push("/login");
    } else {
      setErrorMsg(data.message || "Verification failed");
      console.log(data);
    }
  }

  if (!email) {
    return (
      <div className="page">
        <main className="registration-form">
          <h1 className="title">Verify Here</h1>
          <p className="error">
            No email found. Please register again or check your verification link.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <main className="registration-form">
        <h1 className="title">Verify Here</h1>

        <form className="form">
          <div>
            <label>OTP</label>
            <input
              className="input-field"
              type="text"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="Enter your OTP"
            />
          </div>
          {errorMsg && <p className="error">{errorMsg}</p>}

          <button className="button" type="button" onClick={handleVerifyOTP}>
            Verify OTP
          </button>
        </form>

        <div className="text-buttons">
          <button className="text-button" type="button" onClick={handleOTPResend}>
            Resend OTP
          </button>
        </div>
      </main>
    </div>
  );
}

export default function VerifyOTP() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPForm />
    </Suspense>
  );
}