import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../Variable";

const CheckOut = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLine3, setAddressLine3] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  // Fetch cart items from the backend
  // useEffect(() => {
  //   if (!token) {
  //     toast.error("User is not authenticated. Please log in.");
  //     navigate("/login");
  //     return;
  //   }

  const fetchCartItems = async () => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      const response = await axios.get(`${API_URL}/cart/getcart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data.cartItems || []);
      console.log("response", response.data.cartItems);
      console.log("itens", cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to fetch cart items. Please try again.");
    }
  };

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;
      fetchCartItems(userId);
    } catch (error) {
      console.error("Invalid token:", error);
      setIsAuthenticated(false);
    }
  }, [token]);

  // Calculate the total price whenever cart items or their quantities change
  useEffect(() => {
    const subtotal = cartItems?.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    const tax = subtotal * 0.05; // 5% tax
    const shipping = 60.0; // Fixed shipping cost
    setTotalPrice(subtotal + tax + shipping);
  }, [cartItems]);

  // Handle quantity change (increase or decrease)
  const handleQuantityChange = async (itemId, type) => {
    try {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === itemId) {
          let newQuantity = item.quantity + (type === "increase" ? 1 : -1);
          return { ...item, quantity: Math.max(newQuantity, 1) };
        }
        return item;
      });

      const updatedItem = updatedCartItems.find((item) => item.id === itemId);
      if (!updatedItem) return;

      await axios.put(
        `${API_URL}/cart/updatequantity/${itemId}`,
        { quantity: updatedItem.quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity.");
    }
  };

  const handleConfirmOrder = async () => {
    if (
      !firstName ||
      !lastName ||
      !addressLine1 ||
      !addressLine2 ||
      !city ||
      !state ||
      !country ||
      !zipCode ||
      !phoneNumber ||
      !email ||
      !paymentMethod
    ) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userId = decodedToken.id;

    const shippingAddress = {
      userId,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      state,
      country,
      zipCode,
      paymentMethod,
      totalPrice,
      phoneNumber,
      email,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };

    try {
      const response = await axios.post(
        `${API_URL}/order/create`,
        shippingAddress,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Order placed successfully!");

        navigate("/"); // Redirect to homepage
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/cart/removeitem/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove item from local state after successful deletion
      const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCartItems);

      toast.success("Item removed from cart successfully!");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item. Please try again.");
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value); // Update state with selected value
  };

  console.log("cartitems", cartItems);

  return (
    <>
      <ToastContainer />
      <div className="max-xl  max-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        {!isAuthenticated ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">
              Please login to check your cart!
            </strong>
            <p className="mt-2">
              You must be logged in to proceed with checkout.
            </p>
            <Link
              to="/login"
              className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Login Now
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mt-2">
              Please add some items to proceed with checkout.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  Contact Info
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Your phone number"
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">
                    Address line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Address line 1"
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    onChange={(e) => setAddressLine1(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">
                    Address line 2 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Address line 2"
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    onChange={(e) => setAddressLine2(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">
                    Address line 3
                  </label>
                  <input
                    type="text"
                    placeholder="Address line 2"
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    onChange={(e) => setAddressLine3(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="State"
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Country"
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">
                    Zip Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ZipCode"
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    onChange={(e) => setPincode(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="material-icons mr-2">payment</span> Payment
                </h2>
                <div>
                  {/* Cash on Delivery */}
                  <label className="flex items-center mb-3">
                    <input
                      type="radio"
                      name="payment-method"
                      value="Cash on Delivery"
                      className="mr-3"
                      checked={paymentMethod === "Cash on Delivery"} // Bind state to this radio button
                      onChange={handlePaymentChange} // Update state when this is selected
                    />
                    Cash on Delivery
                  </label>

                  {/* Online / Netbanking */}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment-method"
                      value="Online / Netbanking"
                      className="mr-3"
                      checked={paymentMethod === "Online / Netbanking"} // Bind state to this radio button
                      onChange={handlePaymentChange} // Update state when this is selected
                    />
                    Online / Netbanking
                  </label>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div>
              {/* Order Summary Section */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  {cartItems && cartItems.length > 0 ? (
                    cartItems?.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                      >
                        <div className="flex items-center space-x-4 w-full sm:w-auto">
                          <img
                            src={
                              `${API_URL}/${
                                JSON.parse(item.product.images)[0]
                              }` || "https://via.placeholder.com/50"
                            }
                            alt={item.product.name || "Product Image"}
                            className="w-[60px] h-[60px] object-cover rounded-md border"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.product.name || "Unnamed Product"}
                            </p>
                            <p className="text-sm text-gray-500">
                              ₹{item.product.price || 0}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, "decrease")
                            }
                            className="bg-gray-200 text-gray-900 px-2 py-1 rounded-md hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="text-gray-800 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, "increase")
                            }
                            className="bg-gray-200 text-gray-900 px-2 py-1 rounded-md hover:bg-gray-300"
                          >
                            +
                          </button>
                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p> Your Cart is Empty</p>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>
                      ₹{(totalPrice - totalPrice * 0.05 - 60).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span>₹60.00</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (5%):</span>
                    <span>
                      ₹
                      {(
                        cartItems?.reduce(
                          (sum, item) =>
                            sum + item?.quantity * item?.product.price,
                          0
                        ) * 0.05
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total:</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className="bg-black text-white w-full py-3 rounded-md hover:bg-green-700 text-lg font-medium"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckOut;
