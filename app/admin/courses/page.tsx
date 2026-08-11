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
  async function handleStatusChange(id:string){

    const response = await fetch(`/api/courses/${id}`,{method:"PATCH"});
    const data = await response.json();
    if(response.ok){
      alert("success status changed");
    }

  };

  useEffect(()=>{
        async function getCourses() {
            const response = await fetch("/api/courses", {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if(response.ok){
                setCourses(data);
            }
        }
        getCourses();
    },[]);

  async function handleDeleteCourse(id:string){
      const response = await fetch(`/api/courses/${id}`,
        {method:"DELETE",headers:{"Content-type":"application/json"}})
        const data = await response.json();
            if(response.ok){
              alert("Succesfully deleted");
              setCourses((currentCourses)=>currentCourses.filter((course) => course._id !== id));
            }
            else{
              alert(data.message);
            }
  }

  function handleEditCourse(id:string){
       router.push(`/admin/courses/editCourses/${id}`)
  };

  function handleAddCourse (){
       router.push("/admin/courses/addCourses") 
  };

  const router= useRouter();
  const [courses,setCourses]=useState<Course[]>([]);
  const [checkBox,setCheckBox]= useState(false);
  
    return (
    <div>
      <div className="flex gap-2">
        { checkBox && 
        <>
         <button className="Add-account"> Status Active All</button>
         <button className="Add-account"> Status Inactive All</button>
         <button className="Add-account"> Delete All</button> 
         <button className="Add-account"> Assign To</button>
         </>
        }</div>

    <div className="flex justify-between items-center">      
      <h1 className="font-bold text-2xl"> Courses </h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleAddCourse}>Add Courses</button>

</div>
    <div className="flex justify-between width-100">
        <table>
    <thead>
        <tr className="border-b">
        <th className="flex p-3 text-left gap-2"><input type="checkbox"/>Select All</th>  
        <th className="p-3 text-left">Course Code</th>
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
      <td className="p-3"><input type="checkbox" onChange={(e) => (e.target.checked)}/></td>
      <td className="p-3">{courses.code}</td>
      <td className="p-3">{courses.title}</td>
      <td className="p-3">{courses.department}</td>
      <td className="p-3">{courses.program}</td>
      <td className="p-3">{courses.creditHours}</td>
      <td className="p-3">{courses.semester}</td>
      <td className="p-3">
        {courses.status}
      </td>

      <td className="p-3">
        {<div className="flex gap-10">
          <button className={`px-2 py-1 rounded-md text-white ${
            courses.status === "active"
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={()=>handleStatusChange(courses._id)}>{ courses.status === "active" ?("inactive"):("active")}</button>
        <button className="Add-account" onClick={()=>handleEditCourse (courses._id)} >Edit</button>
        <button className="Add-account" onClick={()=>handleDeleteCourse (courses._id)} >Delete</button>  
        </div>}
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
    </div>
  );
}