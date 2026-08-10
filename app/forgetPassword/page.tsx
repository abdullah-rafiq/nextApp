"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Registration() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOTP, setShowOTP] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleGoLogin() {
    router.push("/login");
  }

  // Verify OTP
  async function handleCheckOTP() {
    const response = await fetch("/api/verifyOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        OTP: otp,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setShowPassword(true);
    } else {
      console.log(data);
    }
  }

  // Check email
  async function handleCheckEmail() {
    const response = await fetch("/api/checkuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      setShowOTP(true);
    } else {
      console.log(data);
    }
  }

  return (
    <main>

      {/* TITLE */}
      <h1>
        {!showOTP
          ? "Reset Password"
          : !showPassword
          ? "Verify OTP"
          : "Reset Password"}
      </h1>


      {/* EMAIL STEP */}
      {!showOTP && (
        <>
          <div>
            <label>Email</label>

            <input
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <button
            className="button"
            type="button"
            onClick={handleCheckEmail}
          >
            Send OTP
          </button>
        </>
      )}


      {/* OTP STEP */}
      {showOTP && !showPassword && (
        <>
          <div>
            <label>Enter OTP</label>

            <input
              className="input-field"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>

          <button
            className="button"
            type="button"
            onClick={handleCheckOTP}
          >
            Verify OTP
          </button>
        </>
      )}


      {/* PASSWORD STEP */}
      {showPassword && (
        <>
          <div>
            <label>New Password</label>

            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>


          <div>
            <label>Confirm Password</label>

            <input
              className="input-field"
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm password"
            />
          </div>


          <button
            className="button"
            type="button"
          >
            Reset Password
          </button>
        </>
      )}


      {/* LOGIN BUTTON */}
      {!showPassword && (
        <button
          className="button"
          type="button"
          onClick={handleGoLogin}
        >
          Login
        </button>
      )}

    </main>
  );
}