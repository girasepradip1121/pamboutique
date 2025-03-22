import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../Variable";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', 
    size: '', 
    email: '',
    style: '', 
    designPreference: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      // Send POST request to backend
      const response = await axios.post(`${API_URL}/contact/addrequest`, formData);

      if (response.status === 201) {
        toast.success("Request Sent Successfully")
        //alert("Request sent successfully");
      }
    } catch (error) {
      console.error(error);
      toast.success("Failed To Submit Request")
      //alert("Failed to submit your request.");
    }
  };

  return (
    <>
    <ToastContainer/>
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-center mb-4">
        Create Your Custom T-Shirt
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Please fill out this form, and we will get back to you with your customized design.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name" // Changed from fullName
              placeholder="Enter your full name"
              value={formData.name} // Changed from fullName
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">T-Shirt Size</label>
            <input
              type="text"
              name="size" // Changed from tShirtSize
              placeholder="Enter size (e.g., M, L)"
              value={formData.size} // Changed from tShirtSize
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">T-Shirt Style</label>
            <input
              type="text"
              name="style" // Changed from tShirtStyle
              placeholder="Enter style (e.g., Polo, Round Neck)"
              value={formData.style} // Changed from tShirtStyle
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
        </div>

        {/* Design Preference */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Design Preference</label>
          <textarea
            name="designPreference"
            placeholder="Describe your design preference"
            value={formData.designPreference}
            onChange={handleChange}
            rows="4"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-300"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 w-full md:w-auto mx-auto block text-center"
        >
          Send Message
        </button>
      </form>
    </div>
    </>
  );
};

export default Contact;
