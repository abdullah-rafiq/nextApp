```jsx
"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function VerifyOTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [OTP, setOTP] = useState("");

  async function handleOTPResend() {
    // Add resend OTP logic here later
  }

  async function handleVerifyOTP() {
    const response = await fetch("/api/verifyOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        OTP,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push("/login");
    } else {
      console.log(data);
    }
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

          <button
            className="button"
            type="button"
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </button>

        </form>

        <div className="text-buttons">
          <button
            className="text-button"
            type="button"
            onClick={handleOTPResend}
          >
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
```
