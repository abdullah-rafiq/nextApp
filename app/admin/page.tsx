"use client";

import {useRouter} from "next/navigation"
import { useState } from "react";

export default function Admin() {

  const router = useRouter();

  async function handleLogout(){
    
    const respone = await fetch("/api/logout",{
        method: "Post",

    });

    if(respone.ok){
    router.push("/login");
    }
    else{

      console.log("error");
    }
  }
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [error, setError] = useState({ name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:"",
  });

    function handleStudent() {
        setRole("Student");
        setShowForm(true);
    }

    function handleTeacher(){
        setRole("Teacher");
        setShowForm(true);
    }

  return (

<div className="page">
  <main className="homePage">

   <h1 className="title">Admin</h1>
        <div className="homeBody">
            <button className="button" type="button" onClick={handleLogout}>Logout</button>
        </div>

        <div className="Account Creation ">
            <button className="Add-account" type="button" onClick={handleStudent}>Create Student Account</button>
            <button className="Add-account" type="button" onClick={handleTeacher}>Create Teacher Account</button>
        </div>

        {showForm && (
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
                <label>Password</label>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error.password && <p className="error">{error.password}</p>}
              </div>

              <div>
                <label>Confirm Password</label>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error.confirmPassword && (
                  <p className="error">{error.confirmPassword}</p>
                )}
              </div>
            </form>
          </div>
        )}
    </main>
        </div>
 );
}
