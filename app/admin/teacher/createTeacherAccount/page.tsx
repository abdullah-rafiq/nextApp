"use client";

import {useRouter} from "next/navigation"
import { useState } from "react";

export default function Admin() {

    function handleBack(){
        router.push("/admin/teacher")
  };
  const router = useRouter();
  async function handleRegister(){
    // Later we will save user data here
    const newErrors = {
    name: "",
    email: "",
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

  if(role===""){
    newErrors.role="Do select a role"
  }

  setError(newErrors);
  
  if (
    newErrors.name ||
    newErrors.email ||
    newErrors.role)
    {
    return;
  }
  // If there are no errors, proceed with registration
    //router.push("/login");

    const response = await fetch("/api/adminRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, role}),
    });

    const data = await response.json();
    if (response.ok) {
      //TODO implement Email send       
        console.log("data");
    } else {
      console.log(data);
    }

  }


  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const [role, setRole] = useState("Teacher");

  const [error, setError] = useState({ name: "",
    email: "",
    role:"",
  });
  return (

<div className="page">
  <main className="homePage">
   <div>
        <button className="Add-account" type="button" onClick={handleBack}>Back</button>
    </div>
   <h1 className="title">Create Teacher Account</h1>
        

      
          <div className="registration-form">
            <form className="form">
              <div>
                <label>Name</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {error.name && <p className="error">{error.name}</p>}
              </div>

              <div>
                <label>Email</label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error.email && <p className="error">{error.email}</p>}
              </div>


              <div>
                <button type="button" className="Add-account" onClick={handleRegister}>Create Account</button>
              </div>
            </form>
          </div>
      
    </main>
        </div>
 );
}