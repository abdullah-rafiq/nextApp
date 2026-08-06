"use client";

import {useRouter} from "next/navigation"
import { useState } from "react";

export default function Admin() {

  const router = useRouter();

  return (

<div>
  <main className="homePage">
   
   <h1 className="title">Admin</h1>
        <div className="homeBody">
</div>

    <div className="stat-grid">
      <div className="stat-card">
        <p className="stat-text"> Students</p>
        <h2 className="stat-heading">120</h2>
      </div>










    </div>
    </main>
        </div>
 );
}