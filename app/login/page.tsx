"use client";
import Image from "next/image";


import { useRouter } from "next/navigation";


export default function Login() {

const router = useRouter();

  function handleClickForgetPassword(){    // Later we will save user data here

    router.push("/forgetPassword");

  }

  function handleClickCreateAccount(){
        // Later we will save user data here
    
  router.push("/");
  }

  function handleClickGoHome(){ 

    router.push("/home");
    console.log("Go Home button clicked");
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

    
  <button className="text-button" type="button" onClick={handleClickCreateAccount}>
    Create New Account
  </button>
  <button className="text-button" type="button" onClick={handleClickForgetPassword}>
    Forget Password?
  </button>
 

    </main>
        </div>
 );
}
