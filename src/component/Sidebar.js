import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  Home, Users, ShoppingCart, Package, CheckCircle, 
  Mail, Menu, LogOut,Tag
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div>
      {/*  Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={toggleSidebar}></div>
      )}

      {/*  Sidebar */}
      <div className={`fixed lg:relative top-0 left-0 h-screen bg-gray-800 text-white flex flex-col shadow-lg pt-16 w-72 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-72"} transition-transform duration-300 lg:translate-x-0 lg:w-64`}>

       
        <button className="lg:hidden absolute top-4 right-4 text-white" onClick={toggleSidebar}>
          ✖
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col p-4 space-y-4">
          {[  
            { to: "/admin", label: "Dashboard", icon: <Home size={20} /> },
            { to: "/admin/category", label: "Category", icon: <Tag size={20} /> },
            { to: "/admin/users", label: "Users", icon: <Users size={20} /> },
            { to: "/admin/products", label: "Products", icon: <Package size={20} /> },
            { to: "/admin/orders", label: "Orders", icon: <ShoppingCart size={20} /> },
            { to: "/admin/accepted-orders", label: "Accepted Orders", icon: <CheckCircle size={20} /> },
            { to: "/admin/manage-contact", label: "Manage Contact", icon: <Mail size={20} /> },
           
          ].map((item) => (
            <NavLink 
              key={item.to} 
              to={item.to} 
              end
              onClick={toggleSidebar} // Mobile pe click karne ke baad band ho jaye
              className={({ isActive }) => 
                `flex items-center space-x-2 p-3 rounded-lg transition ${isActive ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-gray-700"}`
              }
            >
              {item.icon} <span>{item.label}</span>
            </NavLink>
          ))}

          {/* 🔴 Logout Button */}
          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-2 p-3 rounded-lg hover:bg-red-700 text-white mt-4"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="w-full bg-gray-800 text-white flex items-center justify-between p-4 shadow-md fixed top-0 left-0 right-0 z-50">
      {/* ☰ Hamburger Button for Mobile */}
      <button className="lg:hidden text-white" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>

      {/* 📌 Website Title */}
      <div className="text-xl font-bold">PALM BOUTIQUE</div>

      {/* 👤 Profile Avatar + Dropdown Future ke liye */}
      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold cursor-pointer">
        A
      </div>
    </div>
  );
};

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-4 mt-16">
          {/* 💡 Content Here */}
        </div>
      </div>
    </div>
  );
};

export { Sidebar, Navbar, Layout };

