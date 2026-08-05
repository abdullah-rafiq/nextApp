"use client";

import {useRouter} from "next/navigation"

export default function Home() {

  const router = useRouter();

  function handleLogout(){

    router.push("/login");
  }
  return (

<div className="page">
  <main className="homePage">

   <h1 className="title">Home</h1>
        <div className="homeBody">

      <button className="button" type="button" onClick={handleLogout}>Logout</button>

        </div>
    </main>
        </div>
 );
}
