"use client";

import { useRouter } from "next/navigation";;
import { useState } from "react";
export default function Registration() {

//route hook to navigate to other pages
const router = useRouter();
  function handleLogin(){   
    router.push("/login");
  }
  async function handleRegister(){
    // Later we will save user data here
    const newErrors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

      if (name.trim() === "") {
    newErrors.name = "Name is required";
  }

  if (email.trim() === "") {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email format";
  }

  if (password.trim() === "") {
    newErrors.password = "Password is required";
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters long";
  }

  if (confirmPassword.trim() === "") {
    newErrors.confirmPassword = "Confirm Password is required";
  } else if (confirmPassword !== password) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  setError(newErrors);
  
  if (
    newErrors.name ||
    newErrors.email ||
    newErrors.password ||
    newErrors.confirmPassword)
    {
    return;
  }
  // If there are no errors, proceed with registration
    //router.push("/login");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push("/login");
      //window.location.href = "/login";
    } else {
      console.log(data);
    }

  }
//state hooks to store user input

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

// for showing error messages
const [error, setError] = useState({ name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  return (
    <div className="page">
<main className="registration-form">
  <h1 className="title">Registration Form</h1>

  <form className="form">

      <div>
          <label>Name</label>
          <input className="input-field"
            type="text"
            placeholder="Enter your name"

            //storing value in state hook 
            value={name}onChange={(e) => setName(e.target.value)}
            />
            {error.name && (
                <p className="error">{error.name}</p>
              )}
        </div>

         <div>
          <label>Email</label>
          <input className="input-field"
            type="email"
            placeholder="Enter your email address"
            value={email}onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && (
                <p className="error">{error.email}</p>
              )}
        </div>
      
         <div>
          <label>Password</label>
          <input className="input-field"
            type="password"
            placeholder="Enter your password"
            value={password}onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && (
                <p className="error">{error.password}</p>
              )}
        </div>
        
         <div>
          <label>Confirm Password</label>
          <input className="input-field"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error.confirmPassword && (
                <p className="error">{error.confirmPassword}</p>
              )}
        </div>
  </form>

    <button className="button" type="button" onClick={handleRegister}>
      Register
    </button>

    <button className="button" type="button" onClick={handleLogin}>
      Login
    </button>
  </main>
  </div>

  );
}
