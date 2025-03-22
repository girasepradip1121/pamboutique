import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Eye } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../Variable";

const ManageContact = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const token=localStorage.getItem('userToken')
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${API_URL}/contact/getrequest`,{
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
    } catch (error) {
      toast.error("Error fetching contact requests");
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await axios.delete(`${API_URL}/contact/deleterequest/${id}`,{
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(requests.filter((req) => req.id !== id));
      toast.success("Request Deleted");
    } catch (error) {
      toast.error("Error deleting request");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-6">Manage Contact Requests</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {requests.length > 0 ? (
              requests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-wrap justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  <div className="text-sm md:text-base">
                    <p><strong>Name:</strong> {request.name}</p>
                    <p><strong>Email:</strong> {request.email}</p>
                    <p><strong>Size:</strong> {request.size}</p>
                    <p><strong>Style:</strong> {request.style}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Eye size={18} /> View Details
                    </button>
                    <button
                      onClick={() => deleteRequest(request.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Trash2 size={18} /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No contact requests found.</p>
            )}
          </div>
        )}

        {/* Request Details Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Request Details</h2>
              <p><strong>Name:</strong> {selectedRequest.name}</p>
              <p><strong>Email:</strong> {selectedRequest.email}</p>
              <p><strong>Size:</strong> {selectedRequest.size}</p>
              <p><strong>Style:</strong> {selectedRequest.style}</p>
              <p><strong>Design Preference:</strong> {selectedRequest.designPreference}</p>
              <p><strong>Date:</strong> {new Date(selectedRequest.createdAt).toLocaleDateString()}</p>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageContact;
