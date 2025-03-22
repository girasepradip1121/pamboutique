import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../Variable";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const token=localStorage.getItem('userToken')
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/user/getUser`,{
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      toast.error("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axios.put(`${API_URL}/user/manageUser/${userId}`, { status: newStatus });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
      toast.success("User status updated successfully");
    } catch (error) {
      toast.error("Failed to update user status. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-wrap justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  <div className="text-sm md:text-base">
                    <p><strong>User ID:</strong> {user.id}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      className="bg-gray-700 text-white p-2 rounded"
                    >
                      <option value="Active">Active</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Eye size={18} /> View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </div>
        )}

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">User Details</h2>
              <p><strong>User ID:</strong> {selectedUser.id}</p>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <button 
                onClick={() => setSelectedUser(null)}
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

export default Users;

