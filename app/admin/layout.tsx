'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const router = useRouter();

    async function handleLogout() {
    const respone = await fetch("/api/logout",{
        method: "POST",
    });

    if(respone.ok){
    router.push("/login");
    }
    else{
      console.log("error");
    }
        router.push("/login");
    }
  return (

    <div className="admin-layout">

      <aside className="sidebar">
        <h2 className="title">Admin Panel</h2>
        <nav className="nav-links">
        <Link className="text" href="/admin">Dashboard</Link>

        <Link  className="text" href="/admin/student">
          Students
        </Link>

        <Link className="text" href="/admin/teacher">
          Teachers
        </Link>

        <Link className="text" href="/admin/courses">
          Courses
        </Link>

        <Link className="text" href="/admin/settings">
          Settings
        </Link>
          </nav>
        <button className="logout-btn" type="button" onClick={handleLogout}>Logout</button>
      </aside>
      
      <main className="content">
        {children}
      </main>

    </div>
  );
}