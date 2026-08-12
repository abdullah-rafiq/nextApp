"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowDown, Pencil,Search ,Trash2, CheckCircle, XCircle, } from 'lucide-react';


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
  const [sortCredit,setSortCredit] = useState("Asc");
  const [sortsemester,setSemesterSort] = useState("Asc");
  const [sortStatus,setStatusSort] = useState("Asc");

  function myStatusSort(status:string){

   if (status === "active") {
    const sortedCourses = [...courses].sort((a, b) => {
      return a.status === "active" ? -1 : 1;
    });

    setCourses(sortedCourses);
    setStatusSort("Dsc");
  }

  else if (status === "inactive") {
    const sortedCourses = [...courses].sort((a, b) => {
      return a.status === "inactive" ? -1 : 1;
    });

    setCourses(sortedCourses);
    setStatusSort("Asc");

  }
  }
  function myIntSort(sort:string){
   
          if(sort==="Asc"){
            const sortedCourses = [...courses].sort(
          (a, b) => a.creditHours - b.creditHours
          );
          setCourses(sortedCourses);
          setSortCredit("Dsc");
          }

          else if(sort=="Dsc"){
            
            const sortedCourses = [...courses].sort(
          (a, b) => b.creditHours - a.creditHours
          );
          setCourses(sortedCourses);
          setSortCredit("Asc");

          }

  };
  
  function mySemseterSort(sort:string){
   
          if(sort==="Asc"){
            const sortedCourses = [...courses].sort(
          (a, b) => a.semester - b.semester
          );
          setCourses(sortedCourses);
          setSemesterSort("Dsc");
          }

          else if(sort=="Dsc"){
            
            const sortedCourses = [...courses].sort(
          (a, b) => b.semester - a.semester
          );
          setCourses(sortedCourses);
          setSemesterSort("Asc");

          }

  };
  
  async function handleStatusActiveAll(){
    const respone = await fetch(`/api/courses/status`,{
      method:"PATCH",
      body: JSON.stringify({
      ids: selectedCourses,
      status: "active"},  
     )});
    const data= await respone.json();
    if(respone.ok){
      alert("Status Active All");
      const newcourses=[];
      for(let i=0;i<courses.length;i++){
        const course= courses[i];
        if(selectedCourses.includes(course._id)){
        newcourses.push({...course,status:"active"})

        }
        else{
          newcourses.push(course);
        }
        
      }
      setCourses(newcourses);
      setSelectedCourses([]);
    }   
    else{
      console.log(data);
    } 
  };
  
 async function handleDeleteAll(){
    const response = await fetch(`/api/courses/delete`,{method:"DELETE",headers: {
    "Content-Type": "application/json"},body:JSON.stringify({ids:selectedCourses})});
    const data = await response.json();
    
    if(response.ok){
      alert("Scuues");
      const newcourses=[];
      for(let i=0;i<courses.length;i++){
        const course= courses[i];
        if(!selectedCourses.includes(course._id)){
        newcourses.push(course);

        }
        else{
        }
        
      }
      setCourses(newcourses);
      setSelectedCourses([]);

    }
    else{
      alert("Error");
      console.log(data);
    }

  }

 async function handleStatusInactiveAll(){
    const respone = await fetch(`/api/courses/status`,{
      method:"PATCH",body: JSON.stringify({
      ids: selectedCourses,
      status: "Inactive"},  
     )});
    const data= await respone.json();
    if(respone.ok){
      alert("Status InActive All");
      const newcourses=[];
      for(let i=0;i<courses.length;i++){
        const course= courses[i];
        if(selectedCourses.includes(course._id)){
        newcourses.push({...course,status:"inactive"})

        }
        else{
          newcourses.push(course);
        }
        
      }
      setCourses(newcourses);
      setSelectedCourses([]);

    }   
    else{
      console.log(data);
      alert("data");
    } 
  };

  async function handleStatusChange(id:string){
    const response = await fetch(`/api/courses/${id}`,{method:"PATCH"});
    const data = await response.json();
    
    if(response.ok){
      alert("success status changed");
      const newcourses= [];

      for(let i=0;i<courses.length;i++){

          const course =courses[i]; 
          if(course._id==id){
            newcourses.push({...course,status:course.status==="active"?"inactive":"active"})
          }
          else{
            newcourses.push(course);
          }
      };
    setCourses(newcourses);
    }

    else{
      console.log(data);
      alert(data);
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
  const [selectedCourses,setSelectedCourses]= useState<string[]>([]);
  const [search, setSearch]=useState("");
    return (

    <div className="">
      <div className="flex gap-2 mb-10">
        { selectedCourses.length > 0  && 
        <>
         <button className="Add-account" onClick={handleStatusActiveAll}> Status Active</button>
         <button className="Add-account" onClick={handleStatusInactiveAll}> Status Inactive</button>
         <button className="Add-account" onClick={handleDeleteAll}> Delete</button> 
         <button className="Add-account"> Assign To</button>
         </>
        }</div>

    <div className="flex justify-between items-center mb-10">      
      <h1 className="font-bold text-2xl"> Courses </h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleAddCourse}>Add Courses</button>

</div>
<div className="flex items-center gap-2 mb-10 bg-white border border-gray-400 rounded-lg px-3 py-2 w-80 hover:border-blue-500 transition-colors duration-200 focus-within:border-blue-500">
  < Search color = "#9ca3af" size={18} />
<input className="outline-none bg-transparent w-full"  placeholder="Search " onChange={(e)=>setSearch(e.target.value)}
/>
</div>
    <div className="flex items-center w-full border rounded-lg">
        <table className="w-full ">
    <thead >
        <tr className="">
        <th className="p-3 text-left">
          <div className="flex gap-2">
          
          <input type="checkbox" 
          checked={courses.length>0 &&  selectedCourses.length === courses.length}
          onChange={(e)=>{
          if (e.target.checked){
            const ids = [];
            for(let i=0;i<courses.length;i++){
              ids.push(courses[i]._id);
            }
            setSelectedCourses(ids);
          }
          else{
            setSelectedCourses([]);
          }

        }}/> </div> </th>  
        <th className="p-3 text-left">
          Course Code  
          </th>
        <th className="p-3 text-left">
          Title  
        </th>
        <th className="p-3 text-left">
          Department </th>
        <th className="p-3 text-left">
          Program </th>
        <th className="p-3 text-left">
          <div className="flex items-center gap-2">
          Credit Hours
           {sortCredit ==="Asc"? (<button type="button" onClick={()=>myIntSort("Asc")}>< ArrowUp size={16} /></button>):
            <button type="button" onClick={()=>myIntSort("Dsc")}>< ArrowDown size={16} /> </button>}
            
            </div></th>
        <th className="p-3 text-left">
          <div className="flex items-center gap-2">
          Semester 
          {sortsemester ==="Asc"? (<button type="button" onClick={()=>mySemseterSort("Asc")}>< ArrowUp size={16} /></button>):
            <button type="button" onClick={()=>mySemseterSort("Dsc")}>< ArrowDown size={16} /> </button>}
            
          </div></th>
        <th className="p-3 text-left">
          <div className="flex items-center gap-2">
          Status  
          {sortStatus ==="Asc"? (<button type="button" onClick={()=>myStatusSort("active")}>< ArrowUp size={16} /></button>):
            <button type="button" onClick={()=>myStatusSort("inactive")}>< ArrowDown size={16} /> </button>}
            
          </div> </th>
        <th className="p-3 text-left">
          Actions  </th>
      </tr>
    </thead>

    <tbody>

  {courses.map((courses) => (
    <tr key={courses._id} className="">
      <td className="p-3"><input type="checkbox" 
        checked={selectedCourses.includes(courses._id)}
        onChange={(e)=>{
        if( e.target.checked ){
          setSelectedCourses( (prev) => [...prev,courses._id])
        }
        else{
            setSelectedCourses((prev) => prev.filter((id)=> id !== courses._id))
        }
      }}/></td>
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
        <div className="flex gap-4">
          <button className="px-2 py-2 rounded-lg text-white bg-[#EBEBEB]"
            onClick={()=>handleStatusChange(courses._id)}>
            {courses.status==="active"?
              ( < CheckCircle color="#f00808" size={18}/>):
              ( < XCircle color="#14fe14" size={18}/>)
            }
            </button>
          <button className="px-2 py-2 rounded-lg text-white bg-[#EBEBEB]" onClick={()=>handleEditCourse(courses._id)}>
            <Pencil color="#171717" size={18} />
          </button>
          <button className="px-2 py-2 rounded-lg text-white bg-[#EBEBEB]" onClick={()=>handleDeleteCourse(courses._id)}>
            <Trash2 color="#171717" size={18}/>
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
    </div>
  );
}