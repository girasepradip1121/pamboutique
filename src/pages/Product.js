import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2, PlusCircle} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastStyles.css";
import { API_URL } from "../Variable";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories,setCategories]=useState([])
  const token = localStorage.getItem("userToken");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    originalPrice: "",
    description: "",
    stock: "",
    categoryId: "",
    images: [], // Changed to handle multiple images
    type:""
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/category/getall`,);
      setCategories(response.data);
      console.log("categories", response.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  // const handleCategoryChange = (e) => {
  //   console.log("target",e);
    
  //   setForm({ ...form, categoryId: e.target.value }); 
  // };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(cat => cat.categoryId === Number(e.target.value));
    
    // if (selectedCategory) {
    //     console.log("Selected Type:", selectedCategory.type);  // Sirf type print karega
    // }

    
    setForm({ ...form, categoryId: e.target.value,type:selectedCategory.type }); // Form me sirf categoryId update hoga
};


  const fetchProducts = async () => {
    try {
      const response = await axios.post(`${API_URL}/product/getproducts`);
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed To Fetch Products");
      console.error("Failed to fetch products", error);
    }
  };
  const handleEdit = (product) => {
    setForm({
      ...product,
      images: Array.isArray(product.images) ? product.images : JSON.parse(product.images || "[]"),
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/product/deleteproduct/${id}`,{
        headers:{Authorization: `Bearer ${token}`}
      });
      toast.success("Product Deleted...");
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      toast.error("Error Deleting Product...");
      console.error("Failed to delete product", error);
    }
  };

  const handleAddProduct = () => {
    setForm({
      id: "",
      name: "",
      price: "",
      originalPrice: "",
      description: "",
      stock: "",
      categoryId: "",
      images: [], 
      type:""

    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Ensure form.images is always an array
    const existingImages = Array.isArray(form.images) ? form.images : [];

    if (files.length + existingImages.length <= 4) {
        setForm({ ...form, images: [...existingImages, ...files] });
    } else {
        toast.error("You can upload a maximum of 4 images.");
    }
};

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "images") {
          if (Array.isArray(form[key])) {
              form[key].forEach((image) => {
                  formData.append("images", image);
              });
          } else if (typeof form[key] === "string") {
              try {
                  const existingImages = JSON.parse(form[key]); // Safely parse existing images
                  if (Array.isArray(existingImages)) {
                      existingImages.forEach((img) => {
                          formData.append("images", img);
                      });
                  } else {
                      formData.append("images", existingImages);
                  }
              } catch (error) {
                  console.error("Invalid JSON in images:", form[key]);
                  formData.append("images", form[key]); // Fallback in case of invalid JSON
              }
          }
      } else {
          formData.append(key, form[key]);
      }
      
  });
  

    // Check FormData content before sending it
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      let response;
      if (isEditing) {
        response = await axios.put(
          `${API_URL}/product/editproduct/${form.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", 
               Authorization: `Bearer ${token}`
            },
          }
        );
      } else {
        response = await axios.post(
          `${API_URL}/product/addproduct`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            },
          }
        );
        console.log(response);
        
      }

      fetchProducts();
      setIsModalOpen(false);
      toast.success("Product Saved Successfully");
    } catch (error) {
      toast.error("Error saving product...");
      console.error("Failed to save product", error);
    }
  };

  console.log("Editing Product ID:", form.id);

  const handleRemoveImage = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      images: prevForm.images.filter((_, i) => i !== index),
    }));
  };
  

  return (
    <>
      <ToastContainer />
      <div className="p-4 sm:p-6 bg-gray-900 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">Products</h2>
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            <PlusCircle size={20} /> Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-2 hover:shadow-xl transition-all"
            
            >
              <img
                src={product.images && product.images.length > 0 ? `${API_URL}/${JSON.parse(product.images)[0]}` : "default-image-path.jpg"}
                alt={product.name}
                className="w-full h-32 sm:h-40 object-cover rounded-xl"
              />

              <h3 className="text-lg text-black font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{product.description}</p>
              <p className="text-blue-500 font-bold">₹{product.price}</p> 

              <div className="flex gap-4 mt-2 justify-center sm:justify-start">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded-md"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div> 
            </div>
          ))}
        </div>

        {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 text-black px-4 sm:px-0 z-50">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md sm:w-96">
                <h2 className="text-xl font-bold mb-4 text-white text-center">
                  {isEditing ? "Edit Product" : "Add Product"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                  />
                  <input
                    type="number"
                    name="originalPrice"
                    placeholder="Original Price"
                    value={form.originalPrice}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                  />
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                  />
                 <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleCategoryChange}
                  className="w-full p-2 rounded bg-gray-700 text-white mb-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.c_name}
                    </option>
                  ))}
                </select>
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                  ></textarea>
                  
                  {/* Input for multiple files */}
                  <input
                    type="file"
                    name='images'
                    multiple
                    onChange={handleFileChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                  {/* Show existing images (only in edit mode) */}
                  {Array.isArray(form.images) && form.images.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {form.images.map((img, index) => (
                        <div key={index} className="relative w-16 h-16">
                          <img
                            src={typeof img === "string" ? `${API_URL}/${img}` : URL.createObjectURL(img)}
                            alt={`Uploaded ${index}`}
                            className="w-full h-full object-cover rounded"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
                            onClick={() => handleRemoveImage(index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}


                  <div className="flex gap-2 mt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 px-4 py-2 rounded text-white w-full mt-2"
                    >
                      {isEditing ? "Update" : "Add"}
                    </button>
            
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-red-500 px-4 py-2 rounded text-white w-full mt-2"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

      </div>
    </>
  );
};

export default Products;
