"use client";

import {useRouter} from "next/navigation"
import { useEffect, useState } from "react";

export default function Admin() {

  const router = useRouter();
  const [studentCount, setStudentCount]=useState(0);
  const [teacherCount, setTeacherCount]=useState(0);
useEffect(() => {
  async function getStudentCount() {
    const response = await fetch("/api/countStudents");
    const data = await response.json();

    setStudentCount(data.count);
  }

  getStudentCount();
}, []);
useEffect(() => {
  async function getTeacherCount() {
    const response = await fetch("/api/countTeachers");
    const data = await response.json();

    setTeacherCount(data.count);
  }

  getTeacherCount();
}, []);

  return (

<div>
  <main className="homePage">
   
   <h1 className="title">Admin</h1>
        <div className="homeBody">
</div>

    <div className="stat-grid">
      <div className="stat-card">
        <p className="stat-text"> Students</p>
        <h2 className="stat-heading">{studentCount}</h2>
      </div>

      <div className="stat-card">
        <p className="stat-text"> Teachers</p>
        <h2 className="stat-heading">{teacherCount}</h2>
      </div>

        <div className="stat-card">
        <p className="stat-text"> Total</p>
        <h2 className="stat-heading">{studentCount + teacherCount}</h2>
      </div>
      






    </div>
    </main>
        </div>
 );
}