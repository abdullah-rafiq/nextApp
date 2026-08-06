"use client";

import {useRouter} from "next/navigation"
import { useState } from "react";

export default function Student() {
 
  const router = useRouter();

  // Temporary sample data to avoid "Cannot find name 'usersData'" error
  const usersData = [
    { id: 1, name: 'Alice Johnson', role: 'Student', subject: 'Mathematics' },
    { id: 2, name: 'Bob Smith', role: 'Student', subject: 'History' },
    { id: 3, name: 'Carol Lee', role: 'Student', subject: 'Biology' },
  ];

  return (
    <div className="page">
            <div className="overflow-x-auto border rounded-lg">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {usersData.map((user) => (
        <tr key={user.id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.subject}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        </div>
 );
}