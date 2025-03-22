// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { API_URL } from "../Variable";

// const ProductPage = () => {
//   const location = useLocation();
//   const product = location.state?.product;

//   // ✅ Fix: Product images ko JSON.parse() se array me convert karna
//   const productImages = product?.images ? JSON.parse(product.images) : [];

//   // ✅ Fix: Default selected image pehli wali set karna
//   const [selectedImage, setSelectedImage] = useState(
//     productImages.length > 0 ? `${API_URL}/${productImages[0]}` : ""
//   );

//   const [selectedSize, setSelectedSize] = useState("S");
//   const [stitchingOptions, setStitchingOptions] = useState("Semi Stitched");
//   const [quantity, setQuantity] = useState(1);
//   const token = localStorage.getItem("userToken");

//   const handleAddToCart = async () => {
//     if (!token) {
//       toast.error("Please Login to Add to Cart");
//       return; // Stop execution if the user is not logged in
//     }

//     const decodedToken = JSON.parse(atob(token.split(".")[1]));
//     const userId = decodedToken.id;
//     const productId = product?.id;
//     const size = selectedSize;
//     const stitchingOption = stitchingOptions;
//     const totalPrice = product?.price * quantity;

//     try {
//       const response = await axios.post(
//         `${API_URL}/cart/addtocart`,
//         {
//           userId,
//           productId,
//           size,
//           stitchingOption,
//           quantity,
//           totalPrice,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.status === 201) {
//         toast.success("Product Added To Cart");
//       }
//     } catch (error) {
//       console.error("Error adding to cart", error);
//       toast.error("Error Adding To Cart");
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">
//         {/* ✅ Left Section: Image Gallery */}
//         <div className="flex md:flex-col gap-2 md:w-1/5">
//           {productImages.map((img, index) => (
//             <img
//               key={index}
//               src={`${API_URL}/${img}`} // ✅ Thumbnail image
//               alt={`Thumbnail ${index + 1}`}
//               onClick={() => setSelectedImage(`${API_URL}/${img}`)} // ✅ Thumbnail click event
//               className={`w-16 h-16 md:w-20 md:h-20 rounded-lg cursor-pointer border ${
//                 selectedImage === `${API_URL}/${img}`
//                   ? "border-black"
//                   : "hover:border-gray-800"
//               }`}
//             />
//           ))}
//         </div>

//         {/* ✅ Main Image */}
//         <div className="w-full md:w-3/5">
//           <img
//             src={selectedImage}
//             alt="Main Product"
//             className="w-full rounded-lg shadow-md"
//           />
//         </div>

//         {/* ✅ Right Section: Product Details */}
//         <div className="w-full md:w-1/3 bg-gray-50 p-4 md:p-6 rounded-lg shadow">
//           <h1 className="text-xl md:text-2xl font-bold">
//             {product?.name || "Product Name"}
//           </h1>
//           <p className="text-lg md:text-xl font-semibold text-gray-700 mt-2">
//             ₹{product?.price || 0}
//           </p>
//           <p className="text-sm text-gray-500 line-through">
//             ₹{product?.originalPrice || 0}
//           </p>

//           {/* ✅ Stitching Options */}
//           <div className="mt-4">
//             <h3 className="font-semibold mb-2">Stitching Option:</h3>
//             <div className="flex space-x-2 md:space-x-4">
//               {["Semi Stitched", "Customization"].map((option) => (
//                 <button
//                   key={option}
//                   onClick={() => setStitchingOptions(option)}
//                   className={`px-3 md:px-4 py-2 rounded border ${
//                     stitchingOptions === option
//                       ? "bg-black text-white"
//                       : "bg-white"
//                   }`}
//                 >
//                   {option}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* ✅ Size Selection */}
//           <div className="mt-4">
//             <h3 className="font-semibold mb-2">Size:</h3>
//             <div className="flex space-x-2 md:space-x-4">
//               {["S", "M", "L", "XL", "2XL"].map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-3 md:px-4 py-2 rounded border ${
//                     selectedSize === size
//                       ? "bg-black text-white"
//                       : "bg-gray-200"
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* ✅ Quantity Selector */}
//           <div className="mt-4 flex items-center space-x-2 md:space-x-4">
//             <button
//               onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
//               className="px-3 py-2 bg-gray-200 rounded"
//             >
//               -
//             </button>
//             <span>{quantity}</span>
//             <button
//               onClick={() => setQuantity(quantity + 1)}
//               className="px-3 py-2 bg-gray-200 rounded"
//             >
//               +
//             </button>
//           </div>

//           {/* ✅ Add to Cart Button */}
//           <button
//             className="mt-4 w-full px-5 py-3 bg-black text-white rounded hover:bg-gray-800"
//             onClick={handleAddToCart}
//           >
//             Add to Cart
//           </button>

//           {/* ✅ Price Summary */}
//           <div className="mt-4 border-t pt-2 text-sm">
//             <p>
//               ₹{product?.price || 0} x {quantity} = ₹
//               {product?.price * quantity || 0}
//             </p>
//             <p className="font-bold mt-2">
//               Total: ₹{product?.price * quantity || 0}
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductPage;


import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../Variable";

const ProductPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  const productImages = product?.images ? JSON.parse(product.images) : [];

  const [selectedImage, setSelectedImage] = useState(
    productImages.length > 0 ? `${API_URL}/${productImages[0]}` : ""
  );

  const [selectedSize, setSelectedSize] = useState("S");
  const [stitchingOptions, setStitchingOptions] = useState("Semi Stitched");
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("userToken");

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please Login to Add to Cart");
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userId = decodedToken.id;
    const productId = product?.id;
    const size = selectedSize;
    const stitchingOption = stitchingOptions;
    const totalPrice = product?.price * quantity;

    try {
      const response = await axios.post(
        `${API_URL}/cart/addtocart`,
        {
          userId,
          productId,
          size,
          stitchingOption,
          quantity,
          totalPrice,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success("Product Added To Cart");
      }
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error("Error Adding To Cart");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto  flex flex-col md:flex-row py-8 justify-center ">
        {/* ✅ Left Section: Thumbnails */}
        <div className="flex md:flex-col h-100 px-10 gap-2 flex :justify-center">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={`${API_URL}/${img}`}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setSelectedImage(`${API_URL}/${img}`)}
              className={`w-16 h-20 md:w-20 md:h-24 rounded-lg cursor-pointer border ${
                selectedImage === `${API_URL}/${img}`
                  ? "border-black"
                  : "hover:border-gray-800"
              }`}
            />
          ))}
        </div>

        {/* ✅ Main Image */}
        <div className="w-50 md:w-100 mt-2 flex justify-center ">
          <img
            src={selectedImage}
            alt="Main Product"
            className="w-50 max-w-md md:max-w-lg lg:max-w-xl h-[350px] md:h-[450px] lg:h-[500px] object-contain rounded-lg shadow-md"
          />
        </div>

        {/* ✅ Right Section: Product Details */}
        <div className="w-50 md:w-1/3 bg-gray-50 p-4 px-[5%]   ">
          <h1 className="text-xl md:text-2xl font-bold">
            {product?.name || "Product Name"}
          </h1>
          <p className="text-lg md:text-xl font-semibold text-gray-700 mt-2">
            ₹{product?.price || 0}
          </p>
          <p className="text-sm text-gray-500 line-through">
            ₹{product?.originalPrice || 0}
          </p>

          {/* ✅ Stitching Options */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Stitching Option:</h3>
            <div className="flex space-x-2 md:space-x-4">
              {["Semi Stitched", "Customization"].map((option) => (
                <button
                  key={option}
                  onClick={() => setStitchingOptions(option)}
                  className={`px-3 md:px-4 py-2 rounded border ${
                    stitchingOptions === option
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ Size Selection */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Size:</h3>
            <div className="flex space-x-2 md:space-x-4">
              {["S", "M", "L", "XL", "2XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 md:px-4 py-2 rounded border ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ Quantity Selector */}
          <div className="mt-4 flex items-center space-x-2 md:space-x-4">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="px-3 py-2 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          {/* ✅ Add to Cart Button */}
          <button
            className="mt-4 w-full px-5 py-3 bg-black text-white rounded hover:bg-gray-800"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {/* ✅ Price Summary */}
          <div className="mt-4 border-t pt-2 text-sm">
            <p>
              ₹{product?.price || 0} x {quantity} = ₹
              {product?.price * quantity || 0}
            </p>
            <p className="font-bold mt-2">
              Total: ₹{product?.price * quantity || 0}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
