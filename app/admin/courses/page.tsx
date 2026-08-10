"use client";

export default function Courses() {
    const handleAddCourse = () =>{
        
    };
    return (
    <div className="flex justify-between items-center">
      <h1 className="font-bold text-2xl"> Courses </h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleAddCourse}>Add Courses</button>

    </div>
  );
}