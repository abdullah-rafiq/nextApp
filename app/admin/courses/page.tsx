"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
type Course = {
  _id: string;
  code: string;
  title: string;
  department: string;
  program: string;
  creditHours: number;
  semester: number;
  status: string;
};

export default function Courses() {
   function handleEditCourse(id:string){
       router.push(`/admin/courses/editCourses?id=${id}`)
   };
   function handleAddCourse (){
       router.push("/admin/courses/addCourses")
         
     };

  const router= useRouter();
  const [courses,setCourses]=useState<Course[]>([]);
    
  useEffect(()=>{
        async function getCourses() {
            const response = await fetch("/api/courses");
            const data = await response.json();

            if(response.ok){
                setCourses(data);
            }
        }

        getCourses();
    },[])
  
    return (
    <div>
    <div className="flex justify-between items-center">
      <h1 className="font-bold text-2xl"> Courses </h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleAddCourse}>Add Courses</button>
</div>
    <div>
        <table>
              <thead>
        <tr className="border-b">
        <th className="p-3 text-left">Code</th>
        <th className="p-3 text-left">Title</th>
        <th className="p-3 text-left">Department</th>
        <th className="p-3 text-left">Program</th>
        <th className="p-3 text-left">Credit Hours</th>
        <th className="p-3 text-left">Semester</th>
        <th className="p-3 text-left">Status</th>
        <th className="p-3 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
  {courses.map((courses) => (
    <tr key={courses._id} className="border-b">
      <td className="p-3">{courses.code}</td>

      <td className="p-3">{courses.title}</td>

      <td className="p-3">{courses.department}</td>

      <td className="p-3">{courses.program}</td>

      <td className="p-3">{courses.creditHours}</td>

      <td className="p-3">{courses.semester}</td>

      <td className="p-3">
        {courses.status ? "Active" : "Inactive"}
      </td>

      <td className="p-3">
        {<div className="flex gap-10"><button className="Add-account" onClick={()=>handleEditCourse (courses._id)} >Edit</button>  <button className="Add-account" >Delete</button></div>}
      </td>
    </tr>
  ))}
</tbody>
      </table>

            


    </div>

    </div>
  );
}