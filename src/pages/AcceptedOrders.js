import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../Variable";

const AcceptedOrders = () => {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAcceptedOrders();
  }, []);

  const fetchAcceptedOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/admin/accepted-orders`);
      console.log("Accepted Orders Response:", response.data);
      setBills(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching accepted orders:", err);
      setError("Failed to fetch accepted orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Accepted Orders</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Bill ID</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Total Price</th>
              <th className="border p-2">Tax</th>
              <th className="border p-2">Final Price</th>
              <th className="border p-2">Payment Method</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {bills.length > 0 ? (
              bills.map((bill, index) => (
                <tr key={`${bill.id}-${index}`} className="odd:bg-white even:bg-gray-50">
                  <td className="border p-2">{bill.id}</td>
                  <td className="border p-2">{bill.customer_name}</td>
                  <td className="border p-2">{bill.email}</td>
                  <td className="border p-2">₹{bill.total_price}</td>
                  <td className="border p-2">₹{bill.tax}</td>
                  <td className="border p-2">₹{bill.final_price}</td>
                  <td className="border p-2">{bill.payment_method}</td>
                  <td className="border p-2">{new Date(bill.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center border p-2">
                  No accepted orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AcceptedOrders;  