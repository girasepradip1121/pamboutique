import React, { useEffect, useState } from "react";
import logoh from "../image/logoh.png";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../Variable";
import axios from "axios";
import { Button } from "reactstrap";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("userToken");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("USERID", storedUserId);

    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    } else {
      setUserId(null);
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      console.log("Fetching cart for userId:", userId);
      const fetchCartCount = async () => {
        try {
          if (!userId) return;

          const response = await axios.get(
            `${API_URL}/cart/getcart/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("Cart response", response.data);

          if (response.status === 200) {
            //  Axios me `status` hota hai
            setCartCount(response.data.length); // `response.data` use karo
          } //update cart count
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      };
      fetchCartCount();
    }
  }, [token, userId]);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 shadow-md border-b border-gray-200 sticky top-0 z-50 bg-white md:px-8">
      <div className="flex items-center space-x-2">
        <img src={logoh} alt="Boutique Logo" className="h-8 md:h-10" 
         onClick={() => navigate("/")}
        />
        <h1 className="text-base font-bold text-gray-700 md:text-lg">
          Boutique
        </h1>
      </div>

      <nav className="hidden md:flex md:space-x-6 md:ml-auto md:mr-auto">
        <Link
          to="/"
          className="text-sm font-medium text-gray-600 hover:text-black"
        >
          Home
        </Link>
        {/* <Link to="/Shop" className="text-sm font-medium text-gray-600 hover:text-black">
          Shop
        </Link> */}
        <Button
          className="text-sm font-medium text-gray-600 hover:text-black"
          onClick={() => {
            navigate("/Shop", { state: 1 });
          }}
        >
          Men
        </Button>
        <Button
          className="text-sm font-medium text-gray-600 hover:text-black"
          onClick={() => {
            navigate("/Shop", { state: 2 });
          }}
        >
          Women
        </Button>
        <Link
          to="/Contact"
          className="text-sm font-medium text-gray-600 hover:text-black"
        >
          Contact
        </Link>
      </nav>

      <div className="flex items-center space-x-3 md:space-x-4">
        <button
          onClick={handleSearchClick}
          className="text-gray-600 hover:text-black"
        >
          <FaSearch className="text-lg" />
        </button>

        {showSearch && (
          <form
            onSubmit={handleSearch}
            className="absolute top-14 right-4 bg-white shadow-md p-2 rounded-md flex items-center space-x-2 w-60 md:w-72"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search products..."
              className="border p-2 w-full rounded-md text-sm"
            />
            <button
              type="submit"
              className="bg-black text-white px-3 py-1 rounded-md"
            >
              Go
            </button>
          </form>
        )}

        <Link to="/login">
          <FaUser className="text-gray-600 hover:text-black cursor-pointer" />
        </Link>

        <Link to="/CheckOut">
          <div className="relative">
            <FaShoppingCart className="text-gray-600 hover:text-black cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </div>
        </Link>

        <button onClick={toggleMenu} className="md:hidden">
          {menuOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 right-0 w-full bg-white shadow-md md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            <Link
              to="/"
              className="text-sm font-medium text-gray-600 hover:text-black"
              onClick={toggleMenu}
            >
              Home
            </Link>
            {/* <Link to="/Shop" className="text-sm font-medium text-gray-600 hover:text-black" onClick={toggleMenu}>
              Shop
            </Link> */}
            <span
              className="text-sm font-medium text-gray-600 hover:text-black"
              onClick={() => {
                toggleMenu();
                navigate("/Shop", { state: 1 });
              }}
            >
              Men
            </span>
            <span
              className="text-sm font-medium text-gray-600 hover:text-black"
              onClick={() => {
                toggleMenu();
                navigate("/Shop", { state: 2 });
              }}
            >
              Women
            </span>
            <Link
              to="/Contact"
              className="text-sm font-medium text-gray-600 hover:text-black"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
