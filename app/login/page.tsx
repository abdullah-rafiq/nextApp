"use client";


import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Login() {

const router = useRouter();

  function handleClickForgetPassword(){    // Later we will save user data here

    router.push("/forgetPassword");

  }

  function handleClickCreateAccount(){
        // Later we will save user data here
    
  router.push("/");
  }

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

  async function handleClickGoHome(){ 
    
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
       const data = await response.json();


       if (response.ok){
          router.push("/home")
       }
       else{
        console.log(data);
       }
       }
    
    

  return (

<div className="page">
  <main className="registration-form">

   <h1 className="title"> Login Here</h1>
      <form className="form">
         <div>
          <label>Email</label>
          <input className="input-field"
            type="email"
            placeholder="Enter your email address"/>
        </div>
      
         <div>
          <label>Password</label>
          <input className="input-field"
            type="password"
            placeholder="Enter your password"/>
        </div>

        <button className="button" type="button" onClick={handleClickGoHome}>
          Login
        </button>
  </form>

    
  <div className="text-buttons">
  <button className="text-button" type="button" onClick={handleClickCreateAccount}>
    Create New Account
  </button>
  <button className="text-button" type="button" onClick={handleClickForgetPassword}>
    Forget Password?
  </button>
  </div>
 
    </main>
        </div>
 );
}