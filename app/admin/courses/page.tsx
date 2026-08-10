"use client";

export default function Courses() {
    const handleAddCourse = () =>{
        
    };
    return (
    <div>
    <div className="flex justify-between items-center">
      <h1 className="font-bold text-2xl"> Courses </h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleAddCourse}>Add Courses</button>

    <div className="Table_out">

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
      <tr className="border-b">
        <td className="p-3">CS101</td>
        <td className="p-3">Programming Fundamentals</td>
        <td className="p-3">Computer Science</td>
        <td className="p-3">BSCS</td>
        <td className="p-3">3</td>
        <td className="p-3">1</td>
        <td className="p-3">Active</td>
        <td className="p-3">
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>
    </tbody>
        </table>

            


    </div>

    </div>
    </div>
  );
}