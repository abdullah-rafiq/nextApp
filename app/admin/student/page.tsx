"use client";

import {useRouter} from "next/navigation"
import { useState } from "react";

export default function Admin() {
  const [complete, setcomplete]=useState(false);
  const router = useRouter();
  async function handleRegister(){
    // Later we will save user data here
    const newErrors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
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

  if(role===""){
    newErrors.role="Do select a role"
  }
  setError(newErrors);
  
  if (
    newErrors.name ||
    newErrors.email ||
    newErrors.password ||
    newErrors.confirmPassword ||
    newErrors.role)
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
      body: JSON.stringify({ name, email, password, role}),
    });

    const data = await response.json();
    if (response.ok) {
      //TODO implement Email send       
      setcomplete(true);
        console.log("data");
    } else {
      console.log(data);
    }

  }


  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Student");

  const [error, setError] = useState({ name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:"",
  });
  return (

<div className="page">

        </div>
 );
}