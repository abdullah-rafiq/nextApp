"use client";

import {useRouter} from "next/navigation"
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ParamValue } from "next/dist/server/request/params";



export default function edit() {
  
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  useEffect(() => {
  async function getTeacher() {
    const response = await fetch(`/api/teachers/${id}`);
    const data = await response.json();

    setName(data.name);
    setEmail(data.email);
  }

  getTeacher();
}, [id]);

  function handleBack(){
        router.push("/admin/teacher")
  };
  async function handleRegister(){
    // Later we will save user data here
    const newErrors = {
    name: "",
    email: "",
  };

  if (name.trim() === "") {
    newErrors.name = "Name is required";
  }

  if (email.trim() === "") {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email format";
  }

  
  if (
    newErrors.name ||
    newErrors.email)
    {
    return;
  }
  // If there are no errors, proceed with registration
    //router.push("/login");

    const response = await fetch(`/api/teachers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email}),
    });

    const data = await response.json();
    if (response.ok) {
  alert("Teacher updated successfully");
  router.push("/admin/teacher");
} else {
  alert(data.message);
}
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
   <h1 className="title">Update Teacher Info</h1>
        
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
                <button type="button" className="Add-account" onClick={handleRegister}>Update</button>
              </div>
            </form>
          </div>
      
    </main>
        </div>
 );
}