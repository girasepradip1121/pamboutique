import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../Variable";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [successMessage,setSuccessMessage]=useState("")
  const [userRole,setUserRole]=useState("")
  const navigate = useNavigate();

  // Check if the user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const role=localStorage.getItem("userRole")
    

    
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role)
      if(role==='admin'){
        navigate('/admin')
      }   
     }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("")

    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });
      const {token,role,userId}=response.data
      console.log(response.data);
      
      localStorage.setItem("userToken",token);
      localStorage.setItem("userRole",role)
      localStorage.setItem("userId",userId)
      console.log("User ID from response:", userId);
      
      // localStorage.setItem("userId",userId)
      setIsLoggedIn(true); // Update login status
      setUserRole(role)

      toast.success("Login Successfull")
      setSuccessMessage("Login Successful! Redirecting...")
      
      console.log("Login successful:", response.data);

      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear the token
    localStorage.removeItem("userRole");
    setIsLoggedIn(false); // Update login status
    setUserRole("")
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
    <ToastContainer/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      {isLoggedIn && userRole !=="admin" ? (
        // Display logout button if user is logged in
        <div className="text-center">
          <p className="text-black-500 mb-4">You are already logged in!</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        // Display login form if user is not logged in
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-6"
        >
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

           {/* Success Message Display */}
           {successMessage && (
            <div className="text-black-500 text-sm mt-2">{successMessage}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
          >
            Continue
          </button>
        </form>
      )}

      {/* OR Divider */}
      {!isLoggedIn && (
        <div className="flex items-center justify-center my-6">
          <span className="text-sm text-gray-500">OR</span>
        </div>
      )}

      {/* Register Link */}
      {!isLoggedIn && (
        <p className="text-sm text-gray-600">
          New user?{" "}
          <Link to="/User" className="text-blue-600 hover:underline">
            Create an account
          </Link>
        </p>
      )}
    </div>
    </>
  );
};

export default Login;