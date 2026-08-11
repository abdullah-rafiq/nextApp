"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Course = {
  code: string;
  title: string;
  department: string;
  program: string;
  creditHours: number;
  semester: number;
  status: string;
};

export default function Courses() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [department, setDepartment] = useState("");
  const [program, setProgram] = useState("");
  const [creditHours, setCreditHours] = useState("");
  const [semester, setSemester] = useState("");
  const [status, setStatus]=useState(""); 

  const [error,setError]=useState({
    title:"",
    code:"",
    department:"",
    program:"",
    creditHours:"",
    semester:"",
    status:"",
  });
  

  async function handleSave() {

    const newError={
      title:"",
      code:"",
      department:"",
      program:"",
      creditHours:"",
      semester:"",
      status:"",
    };

    if(title.trim()===""){
      newError.title="Title is required"
    }
    
    if(code.trim()===""){
      newError.code="Code is required"
    }
    
    if(department.trim()===""){
      newError.department="Department is required"
    }
    
    if(program.trim()===""){
      newError.program="Program is required"
    }
    
    if(creditHours.trim()===""){
      newError.creditHours="Credit Hours are required"
    }else{
      const creditNo= parseInt(creditHours);
      if(creditNo < 1 || creditNo > 3){
        newError.creditHours= 'Must between 1 and 3'
      }
    }
    
    if(semester.trim()===""){
      newError.semester="Semester is required"
    }else {
  const semesterNumber = parseInt(semester);

  if (semesterNumber < 1 || semesterNumber > 8) {
    newError.semester = "Semester must be between 1 and 8";
  }
}
setError(newError);

 if (
    newError.title ||
    newError.code ||
    newError.department ||
    newError.program ||
    newError.creditHours ||
    newError.semester)
    {
    return;
  }

    const response = await fetch("/api/courses",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({title, code, department, program, creditHours, semester}),
    })
    const data = await response.json();
    if(response.ok){
      alert("Course Added");
      router.push("/admin/courses");
    }
    else
    {
      alert(data.message);
    }
      }

  function handleCancel() {
    router.push("/admin/courses");
  }

  return (
    <div className="p-6">

      {/* Heading */}
      <div className="flex justify-center mb-8">
        <h1 className="font-bold text-2xl">
          Add Information of Course
        </h1>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-6">

        {/* Title */}
        <div className="flex items-center gap-5">
          <h3 className="w-32">Title</h3>

          <input
            className="border border-gray-300 rounded-md px-3 py-2"
            type="text"
            placeholder="Enter Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
              {error.title && (
                <p className="error">{error.title}</p>
              )}
        </div>

        {/* Course Code */}
        <div className="flex items-center gap-5">
          <h3 className="w-32">Course Code</h3>
          <input
            className="border border-gray-300 rounded-md px-3 py-2"
            type="text"
            placeholder="Enter Course Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
              {error.code && (
                <p className="error">{error.code}</p>
              )}
        </div>

        {/* Department */}
        <div className="flex items-center gap-5">
          <h3 className="w-32">Department</h3>

          <input
            className="border border-gray-300 rounded-md px-3 py-2"
            type="text"
            placeholder="Enter Department Name"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          
              {error.department && (
                <p className="error">{error.department}</p>
              )}
        </div>

        {/* Program */}
        <div className="flex items-center gap-5">
          <h3 className="w-32">Program</h3>

          <input
            className="border border-gray-300 rounded-md px-3 py-2"
            type="text"
            placeholder="Enter Program Name"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          />
          
              {error.program && (
                <p className="error">{error.program}</p>
              )}
        </div>

        {/* Semester */}
        <div className="flex items-center gap-5">
          <h3 className="w-32">Semester</h3>

          <input
            className="border border-gray-300 rounded-md px-3 py-2"
            type="number"
            placeholder="Enter Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
          
              {error.semester && (
                <p className="error">{error.semester}</p>
              )}
        </div>

        {/* Credit Hours */}
        <div className="flex items-center gap-5">
          <h3 className="w-32">Credit Hours</h3>

          <input
            className="border border-gray-300 rounded-md px-3 py-2"
            type="number"
            placeholder="Enter Credit Hours"
            value={creditHours}
            onChange={(e) => setCreditHours(e.target.value)}
          />
          
              {error.creditHours && (
                <p className="error">{error.creditHours}</p>
              )}
        </div>
        {/* Status */}
        <div className="gap-2">
          <label>
          <input type="radio"
          name="status"
          value="active"
          checked={ status === "active" }
          onChange={(e) => setStatus(e.target.value)}/>
          Active
          </label>

          <label>
          <input type="radio"
          name="status"
          value="inactive"
          checked={ status === "inactive" }
          onChange={(e) => setStatus(e.target.value)}/>
          InActive
          </label>
        </div>


        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>

          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
