import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { SuccessToast } from "../../Toast/AllToast";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDashboardRoot = location.pathname === "/admin/dashboard";
  const navigate = useNavigate()

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } fixed z-20 inset-0 bg-black bg-opacity-50 lg:hidden`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 flex flex-col fixed lg:static z-30 w-64 bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out h-full`}
      >
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <nav className="space-y-2">
          <NavLink to="allAgents" onClick={() => setSidebarOpen(!sidebarOpen)} className="block bg-gray-400 hover:bg-gray-700 p-2 rounded">
            View Agents
          </NavLink>
          <NavLink to="allTicket" onClick={() => setSidebarOpen(!sidebarOpen)} className="block bg-gray-400 hover:bg-gray-700 p-2 rounded">
            All Tickets
          </NavLink>
         
        </nav>

        <button className="mt-auto w-full bg-red-500 hover:bg-red-300 transition-colors duration-300 ease-in-out text-white p-2 rounded"
                          onClick={() => {
                            localStorage.removeItem("user")
                            SuccessToast("Logout Successfully")
                            navigate("/login")
                          }}
                        >
                          LogOut
                        </button>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between lg:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu className="text-2xl" />
          </button>
          <h1 className="text-lg font-bold">Dashboard</h1>
        </header>

        <main className="p-6">
        {isDashboardRoot ? (
            <div className="text-center flex justify-center items-center text-2xl font-semibold text-gray-700">
              Welcome to admin dashboard
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}