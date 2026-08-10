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
  status: boolean;
};

export default function Courses() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [department, setDepartment] = useState("");
  const [program, setProgram] = useState("");
  const [creditHours, setCreditHours] = useState("");
  const [semester, setSemester] = useState("");

  async function handleSave() {
    const respone = await fetch("/api/courses",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({title, code, department, program, creditHours, semester}),
    })
    const data= await respone.json();

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
