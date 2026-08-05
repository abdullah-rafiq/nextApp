import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">

      <aside className="sidebar">
        <h2>Admin Panel</h2>

        <Link href="/admin">Dashboard</Link>

        <Link href="/admin/students">
          Students
        </Link>

        <Link href="/admin/teachers">
          Teachers
        </Link>

        <Link href="/admin/courses">
          Courses
        </Link>

        <Link href="/admin/settings">
          Settings
        </Link>
      </aside>

      <main className="content">
        {children}
      </main>

    </div>
  );
}