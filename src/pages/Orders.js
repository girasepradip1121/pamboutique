import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../Variable";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const token=localStorage.getItem('userToken')

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // const token =localStorage.getItem("token");
  
        const response = await axios.get(`${API_URL}/order/getorders`,{
          headers: { Authorization: `Bearer ${token}` },
        }
           
      );
        console.log(response.data);
        
        const updatedOrders = response.data.map((order) => ({
          ...order,
          items: order.OrderItems.map((item) => ({
            name: item.Product.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }));
        setOrders(updatedOrders);
      } catch (err) {
        toast.error("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_URL}/order/manageorder/${orderId}`, 
       { status: newStatus},
        {headers: { Authorization: `Bearer ${token}` }},
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error("Failed to update order status. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.orderId}
                  className="flex flex-wrap justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  <div className="text-sm md:text-base">
                    <p><strong>Order ID:</strong> {order.orderId}</p>
                    <p><strong>Customer:</strong> {order.firstName} {order.lastName}</p>
                    <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      className="bg-gray-700 text-white p-2 rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Eye size={18} /> View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        )}

        {selectedOrder && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
              <p><strong>Name:</strong> {selectedOrder.firstName} {selectedOrder.lastName}</p>
              <p><strong>Address:</strong> {selectedOrder.addressLine1}, {selectedOrder.city}, {selectedOrder.state}, {selectedOrder.country} - {selectedOrder.zipCode}</p>
              <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
              <p><strong>Total Price:</strong> ₹{selectedOrder.totalPrice}</p>
              <h3 className="text-lg font-bold mt-4">Ordered Items:</h3>
              <ul className="list-disc list-inside">
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item, index) => (
                    <li key={index} className="mt-2">
                      {item.name} - {item.quantity} x ₹{item.price}
                    </li>
                  ))
                ) : (
                  <p>No items found.</p>
                )}
              </ul>
              <button 
                onClick={() => setSelectedOrder(null)}
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

export default Orders;

