import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { SuccessToast } from "../../Toast/AllToast";

export default function CustomerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()

  const isDashboardRoot = location.pathname === "/user/dashboard";
  return (
    <div className="flex h-screen">
      {/* Overlay for small screens */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } fixed z-20 inset-0 bg-black bg-opacity-50 lg:hidden`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed flex flex-col lg:static z-30 w-64 bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out h-full`}
      >
        <NavLink to="/user/dashboard" className="text-xl font-bold mb-4">Dashboard</NavLink>
        <nav className="space-y-3 mt-5">
          <NavLink to="create-ticket" onClick={() => setSidebarOpen(false)} className="block bg-gray-700 hover:bg-gray-400 p-2 rounded">
            Create Ticket
          </NavLink>
          <NavLink to="Profile&allTicket" onClick={() => setSidebarOpen(false)} className="block bg-gray-700 hover:bg-gray-400 p-2 rounded">
            All Tickets
          </NavLink>
        </nav>
        <button
          className="mt-auto bg-red-500 hover:bg-red-300 transition-colors duration-300 ease-in-out text-white p-2 rounded"
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
        {/* Header for mobile */}
        <header className="bg-white shadow p-4 flex items-center justify-between lg:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu className="text-2xl" />
          </button>
          <h1 className="text-lg font-bold">Dashboard</h1>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {isDashboardRoot ? (
            <div className="text-center flex justify-center items-center text-2xl font-semibold text-gray-700">
              Welcome to user dashboard
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}
