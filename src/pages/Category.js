import React, { useEffect, useState } from "react";
import { Button, Form } from "reactstrap";
// import axiosInstance from "../Axios/axios";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../Variable";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import axios from "axios";

const Category = () => {
  const token = localStorage.getItem("userToken");

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const type = [
    { value: 1, label: "Men" },
    { value: 2, label: "Women" },
  ];

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openConfirmationModal = (productId) => {
    setCategoryId(productId);
    setIsModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsModalOpen(false);
    setCategoryId(null);
  };

  const handleAddCategory = () => {
    reset({
      type: "",
      c_name: "",
    });
    setIsEdit(false);
    setModalOpen(true);
  };

  const addCategoryFunction = async (data) => {
    setAddLoading(true);
    await axios
      .post(`${API_URL}/category/create`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setModalOpen(false);
          getCategoryDataFunction();
        }
        setAddLoading(false);
        toast.success(response?.data?.status, response?.data?.description);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error Adding Category...");
      });
  };

  const upadateCategoryFunction = async (data) => {
    setAddLoading(true);
    console.log("data", data);

    await axios
      .put(`${API_URL}/category/update/${data.categoryId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response?.status === 200) {
          setModalOpen(false);
          setCategoryList((prev) =>
            prev?.map((category) =>
              category?.categoryId === data?.categoryId
                ? { ...category, c_name: data?.c_name }
                : category
            )
          );
        }
        setAddLoading(false);
        toast.success(response?.data?.message);
        console.log("res", response);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error Updating Category...");
      });
  };

  const deleteCategoryFunction = async (data) => {
    setDeleteLoading(true);
    await axios
      .delete(`${API_URL}/category/delete/${data}`, {
        params: { categoryId: data },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          getCategoryDataFunction();
          closeConfirmationModal();
        }
        setDeleteLoading(false);
        toast.success(response?.data?.success);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error Deleting Category...");
      });
  };

  const getCategoryDataFunction = async () => {
    setLoading(true);
    await axios
      .get(`${API_URL}/category/getall`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);

        if (response.status === 200) setCategoryList(response?.data);
        else setCategoryList([]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed To Fetch Category List.");
      });
  };

  const filteredCategory = categoryList?.filter((category) => {
    return category?.c_name?.toLowerCase().includes(searchQuery?.toLowerCase());
  });

  const fetchFunction = (data) => {
    isEdit ? upadateCategoryFunction(data) : addCategoryFunction(data);
  };

  useEffect(() => {
    getCategoryDataFunction();
  }, []);

  console.log("list", categoryList);

  const columns = [
    {
      name: "No",
      cell: (row, index) => index + 1,
      maxWidth: "220px",
    },
    {
      name: "Name",
      cell: (row) => <span title={row?.c_name}>{row?.c_name}</span>,
      maxWidth: "420px",
    },
    {
        name: "Type",
        cell: (row) => <span title={parseFloat(row?.type)=== 1 ?"Men":"Women"}>{parseFloat(row?.type)=== 1 ?"Men":"Women"}</span>,
        maxWidth: "420px",
      },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-4">
          <Pencil
            cursor="pointer"
            size={18}
            color="green"
            onClick={() => {
              setModalOpen(true);
              setIsEdit(true);
              reset({
                c_name: row?.c_name,
                type: row?.type,

                categoryId: row?.categoryId,
              });
              console.log("row", row);
            }}
          />
          <Trash2
            cursor="pointer"
            size={18}
            color="red"
            onClick={() => openConfirmationModal(row?.categoryId)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />
      <div className="p-6 bg-gray-900 min-h-screen text-white ">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
            Category
          </h2>
          <div className="flex justify-between items-center w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-md w-full sm:w-2/5 sm:mr-4"
            />
            <Button
              onClick={handleAddCategory}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              <PlusCircle size={20} /> Add Category
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-10">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-gray-400 rounded-full">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <DataTable
            pagination
            data={filteredCategory}
            columns={columns}
            customStyles={{
              rows: {
                style: {
                  backgroundColor: "#1f2937",
                  borderBottomColor: "#3b82f6",
                },
              },
              headCells: {
                style: {
                  backgroundColor: "#111827",
                  color: "#f3f4f6",
                  fontSize: "1rem",
                  fontWeight: "bold",
                },
              },
              cells: {
                style: {
                  color: "#f3f4f6",
                  fontSize: "1rem",
                },
              },
            }}
          />
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 text-black px-4 sm:px-0 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md sm:w-full max-h-[85vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-white text-center">
              {isEdit ? "Edit Category" : "Add Category"}
            </h2>
            <Form onSubmit={handleSubmit(fetchFunction)} className="space-y-2">
              {/* Category Type Dropdown */}
              <div className="flex flex-col w-full">
                <Controller
                  control={control}
                  name="type"
                  rules={{ required: "Category Type is required." }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-2 rounded bg-gray-700 text-white"
                    >
                      <option value="">Select Category Type</option>
                      {type.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors?.type && (
                  <p className="text-red-500 text-sm text-left p-2">
                    {errors?.type?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <Controller
                  control={control}
                  name="c_name"
                  rules={{
                    required: "Category Name is required.",
                    validate: (value) =>
                      value?.trim() ? true : "Category Name is required.",
                  }}
                  render={({ field }) => (
                    <input
                      autoFocus
                      {...field}
                      type="text"
                      placeholder="Category Name"
                      className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                  )}
                />
                {errors?.c_name && (
                  <p className="text-red-500 text-sm text-left p-2">
                    {errors?.c_name?.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <Button
                  type="submit"
                  disabled={addLoading}
                  className="bg-blue-500 px-8 py-2 rounded text-white mt-2"
                >
                  {isEdit ? "Update" : "Add"}
                </Button>

                <Button
                  onClick={() => setModalOpen(false)}
                  className="bg-red-500 px-8 py-2 rounded text-white mt-2"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-gray-800 p-6 rounded-lg w-120 shadow-lg">
            <h2 className="text-xl text-white font-semibold mb-4">
              Are you sure you want to delete this category?
            </h2>
            <div className="flex justify-end space-x-6">
              <Button
                onClick={closeConfirmationModal}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
              >
                Cancel
              </Button>
              <Button
                disabled={deleteLoading}
                onClick={() => {
                  setDeleteLoading(true);
                  deleteCategoryFunction(categoryId);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
