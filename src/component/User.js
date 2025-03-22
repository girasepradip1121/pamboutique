import React, { useState } from "react";
import axios from "axios"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../Variable";
import { Link } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState(""); // Add name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message on every submit attempt
    setSuccessMessage(""); // Reset success message

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      // Send registration request to the backend
      const response = await axios.post(`${API_URL}/user/signup`, {
        name,
        email,
        password,
      });

      // Store token in localStorage upon successful signup
      localStorage.setItem("userToken", response.data.token);

      // Set success message
      toast.success("You have Successfully Registered")
      //setSuccessMessage("Registration Successful! You can now log in.");

      // Optionally redirect user after successful signup
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login page after success
      }, 2000);

      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error during signup:", error);
      // Set error message if registration fails
      setErrorMessage(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <>
    <ToastContainer/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-6"
      >
        {/* Full Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>

        {/* Confirm Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password (Again)</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <div className="text-green-500 text-sm mt-2">{successMessage}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
        >
          Continue
        </button>
      </form>

      {/* Login Link */}
      <p className="text-sm text-gray-600 mt-6">
        Already a member?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
    </>
  );
};

export default Registration;
