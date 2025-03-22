import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom"; // Redirect ke liye useNavigate
import { Sidebar, Navbar } from "../component/Sidebar";

const AdminLayoutComponent = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {

   }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar (Toggles on Mobile) */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <div className="p-4 mt-16 bg-gray-900 text-white flex-1 overflow-auto">
          <Outlet /> {/* This will render the admin pages dynamically */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayoutComponent;

