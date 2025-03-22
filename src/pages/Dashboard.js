import React, { useEffect, useState } from "react";
import { ShoppingCart, Package, Users,MessageCircle} from "lucide-react";
import axios from "axios";
import { API_URL } from "../Variable";

const Dashboard = () => {
  const [counts, setCounts] = useState({ orders: 0, products: 0, users: 0 });
  const token =localStorage.getItem("userToken")
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get(`${API_URL}/order/getorders`,{
          headers: { Authorization: `Bearer ${token}` },
        });
        const productsResponse = await axios.get(`${API_URL}/product/getproducts`,{
          headers: { Authorization: `Bearer ${token}` },
        });
        const usersResponse = await axios.get(`${API_URL}/user/getUser`,{
          headers: { Authorization: `Bearer ${token}` },
        });
        const requestResponse=await axios.get(`${API_URL}/contact/getrequest`,{
          headers: { Authorization: `Bearer ${token}` },
        })

        setCounts({
          orders: ordersResponse.data.length,
          products: productsResponse.data.length,
          users: usersResponse.data.length,
          request: requestResponse.data.length,
        });
        
        
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const cards = [
    { title: "Total Orders", count: counts.orders, icon: <ShoppingCart size={40} />, color: "bg-blue-500" },
    { title: "Total Products", count: counts.products, icon: <Package size={40} />, color: "bg-green-500" },
    { title: "Total Users", count: counts.users, icon: <Users size={40} />, color: "bg-purple-500" },
    { title: "Total Request", count: counts.request, icon: <MessageCircle size={40} />, color: "bg-yellow-500" },

  ];

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-lg flex items-center gap-4 ${card.color} bg-opacity-90 transition-transform transform hover:scale-105`}
          >
            <div className="p-4 bg-white bg-opacity-20 rounded-lg">{card.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-4xl font-bold">{card.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
