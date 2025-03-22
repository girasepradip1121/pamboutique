import React, { useEffect,useState } from "react";
import axios from "axios";
import Home1 from "../image/Home1.jpeg";
import shop from "../image/shop.png";
import couple from "../image/couple.png";
import lady from "../image/lady.png";
import saree from "../image/Saree.png";
import salwarKameez from "../image/Salwar Kameez.png";
import lehengaCholi from "../image/Lehenga Choli.png";
import gown from "../image/Gown.png";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Variable";

const categoryImages = {
  Saree: saree,
  "Salwar Kameez": salwarKameez,
  "Lehenga Choli": lehengaCholi,
  "Gown ": gown,
};

const Home = () => {

 const navigate = useNavigate();
 const [featuredProducts, setFeaturedProducts] = useState([]);

 useEffect(()=>{
  //fetch product
  const fetchProducts=async()=>{
    try {
      const response=await axios.post(`${API_URL}/product/getproducts`,{limit:4});
      setFeaturedProducts(response.data)
    } catch (error) {
      console.error("Error fetching products:", error);
    };
  };
  fetchProducts()
 },[]);

 const handleOrdershop = () =>{
    navigate('/Shop')
 }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative">
        <img
          src={Home1}
          alt="Hero"
          className="w-full h-[500px] object-cover"
        />
        <button className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">
          Explore Collection
        </button>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4">
  <h2 className="text-center text-3xl font-bold mb-8">Featured Products</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {featuredProducts.length > 0 ? (
      featuredProducts.slice(0, 4).map((product) => (  // Limit to 4 products
        <div
          key={product.id}
          className="border p-4 rounded-md shadow hover:shadow-lg text-center"
        >
          <img
            src={product.images && product.images.length > 0 ? `${API_URL}/${JSON.parse(product.images)[0]}` : shop}  // Use product image or fallback
            alt={product.name}
            className="w-full h-[290px] object-cover mb-4"
          />
          <h4 className="text-lg font-medium">{product.name}</h4>
          <p className="text-gray-500">₹{product.price}</p>
        </div>
      ))
    ) : (
      <p className="col-span-full text-center text-gray-500">
        Loading products...
      </p>
    )}
  </div>
</section>

{/* Special Occasions Section */}
<section className= "py-12">
  <h2 className="text-center text-3xl font-bold mb-8">
    Be Ready For Every Special Occasion
  </h2>
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="relative">
      <img
        src={couple}
        alt="Wedding Couple"
        className="w-full h-[500px] object-cover rounded-md"
      />
      <div className="absolute bottom-4 left-4  p-4 ">
        <p className="text-sm font-medium text-gray-700">
          Celebrate the history of rich Indian traditions and culture with a high-quality and outstanding range of women’s ethnic wear.
          Each bespoke design is a reflection of craftsmanship, making you look stunning on every occasion.
        </p>
      </div>
    </div>
    <div className="relative">
      <img
        src={lady}
        alt="Elegant Lady"
        className="w-full h-[600px] object-cover rounded-md"
      />
      <div className="absolute bottom-4 left-4 p-4 ">
      </div>
    </div>
  </div>
  <div className="text-center mt-8">
    <button
      className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition "
      onClick={handleOrdershop}
    >
      Shop Now
    </button>
  </div>
</section>


      {/* Categories Section */}
       <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-8">Our Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {["Saree", "Salwar Kameez", "Lehenga Choli", "Gown "].map(
            (category, index) => (
              <div
                key={index}
                className="flex flex-col items-center border p-4 rounded-md shadow hover:shadow-lg"
              >
                <img
                  src={categoryImages[category]}
                  alt={category}
                  className="w-full h-[300px] object-cover mb-4"
                />
                <p>{category}</p>
              </div>
            )
          )}
        </div>
        <div className="text-center mt-8">
          <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">
            Explore More
          </button>
        </div>
      </section>

      {/* Featured Products Section (Repeated) */}
      <section className="max-w-7xl mx-auto px-4">
  <h2 className="text-center text-3xl font-bold mb-8">Featured Products</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {featuredProducts.length > 0 ? (
      featuredProducts.slice(0, 4).map((product) => (  // Limit to 4 products
        <div
          key={product.id}
          className="border p-4 rounded-md shadow hover:shadow-lg text-center"
        >
          <img
            src={product.images && product.images.length > 0 ? `${API_URL}/${JSON.parse(product.images)[0]}` : shop} // Use product image or fallback
            alt={product.name}
            className="w-full h-[290px] object-cover mb-4"
          />
          <h4 className="text-lg font-medium">{product.name}</h4>
          <p className="text-gray-500">₹{product.price}</p>
        </div>
      ))
    ) : (
      <p className="col-span-full text-center text-gray-500">
        Loading products...
      </p>
    )}
  </div>
</section> 

      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default Home;
