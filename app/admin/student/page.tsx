"use client";

import Student from "@/app/student/page";
import {useRouter} from "next/navigation"
import { useEffect, useState } from "react";

export default function Students() {
 
    type Students = {
    _id: string;
    name: string;
    email: string;
    role: string;
  };

  const [students, setStudents] = useState<Students[]>([]);
  const router = useRouter();


  useEffect(()=>{

    async function getStuddents() {    
        const respone = await fetch("/api/getUsers");
        const data = await respone.json();
        setStudents(data);   
        
    }
    getStuddents();

  },[]);

  return (
    <div className="page">
            <div className="overflow-x-auto border rounded-lg">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {students.map((user) => (
        <tr key={user._id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>

        </tr>
      ))}
    </tbody>
  </table>
</div>
        </div>
 );
}