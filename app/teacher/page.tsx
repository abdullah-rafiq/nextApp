"use client";

import {useRouter} from "next/navigation"

export default function Teacher() {

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
  return (

<div className="page">
  <main className="homePage">

   <h1 className="title">Teacher</h1>
        <div className="homeBody">

      <button className="button" type="button" onClick={handleLogout}>Logout</button>

        </div>
    </main>
        </div>
 );
}
