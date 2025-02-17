import apiClient from "../../api/apiConfig";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllCategories = () => {
  const [data, setData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formVisible, setFormVisible] = useState(false); // Form state
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    image: " ",
    categoryName: " ",
  });
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState(5);

  //Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(
          "/categories/list"
        );
        setData(response.data);
        setStatuses(
          response.data.map((item) => ({ id: item.id, status: "Active" }))
        );
      } catch (error) {
        console.error("Error fetchig category data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  //Add Category
  const handledAddCategory = (e) => {
    e.preventDefault();

    apiClient
      .post("/categories/save", formData)
      .then((response) => {
        setData([...data, response.data]);
        resetForm();
      })
      .catch((error) => console.error("Error adding category data", error));
  };

  //Save Edit
  const handleSaveEditCategory = (e) => {
    e.preventDefault();
    apiClient
      .put(`/categories/${editingId}`, formData)
      .then((response) => {
        setData(
          data.map((category) =>
            category.id === editingId ? response.data : category
          )
        );
        resetForm();
      })
      .catch((error) => console.error("Error Saving Data:", error));
  };

  //Edit store
  const handleEditCategory = (category) => {
    setEditingId(category.id);
    setFormData({
      categoryName: category.categoryName,
      image: category.image,
    });
    setFormVisible(true);
  };

  //Delete category
  const handleDeleteCategory = (id) => {
    apiClient
      .delete(`/categories/${id}`)
      .then(() => setData(data.filter((category) => category.id !== id)))
      .catch((error) => console.error("Error deleting data:", error))
      .finally(() => setConfirmDeleteId(null));
  };

  //Reset Form
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      image: "",
      categoryName: "",
    });
    setFormVisible(false);
  };

  // Filtered data based on search query
  const filteredData = data.filter(
    (item) =>
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) // Fix here
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Toggle status function
  const toggleStatus = (id) => {
    setStatuses((prevStatuses) =>
      prevStatuses.map((row) =>
        row.id === id
          ? { ...row, status: row.status === "Active" ? "Inactive" : "Active" }
          : row
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Categories</h1>
        {!formVisible && (
          <button
            onClick={() => setFormVisible(true)}
            className="px-4 py-2 bg-blue-900 text-white rounded-r hover:bg-blue-600"
          >
            + Add Category
          </button>
        )}
      </div>

      {formVisible ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Category" : "Add New Category"}
          </h2>
          <form
            onSubmit={editingId ? handleSaveEditCategory : handledAddCategory}
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="font-medium">Category Name</label>
                <input
                  type="text"
                  name="categoryName"
                  placeholder="Enter category Name"
                  className="border p-2 rounded w-full"
                  value={formData.categoryName}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">Image</label>
                <input
                  type="file"
                  name="Image"
                  className="w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files[0],
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 mr-2 text-white bg-blue-900 rounded hover:bg-blue-600"
              >
                {editingId ? "Save" : "Add"}
              </button>
              <button
                type="button"
                className="ml-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 shadow-md rounded-lg">
          {/* Search Bar */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-l px-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Loading...{" "}
                    </td>
                  </tr>
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No data found
                    </td>
                  </tr>
                ) : (
                  currentData.map((category) => (
                    <tr
                      key={category.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-3">{category.id}</td>
                      <td className="px-6 py-4">{category.image}</td>
                      <td className="px-6 py-4">{category.categoryName}</td>
                      <td className="px-6 py-4">
                        <button
                          className={`px-2 py-1 rounded ${
                            statuses.find((row) => row.id === category.id)
                              ?.status === "Active"
                              ? "bg-green-600 hover:bg-green-600 text-white"
                              : "bg-red-700 hover:bg-red-600 text-white"
                          }`}
                          onClick={() => toggleStatus(category.id)}
                        >
                          {statuses.find((row) => row.id === category.id)
                            ?.status ?? "Active"}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <button
                            className="px-4 py-2 flex items-center text-white bg-blue-800 hover:bg-blue-600 rounded"
                            onClick={() => handleEditCategory(category)}
                          >
                            <FaEdit className="mr-2" />
                            Edit
                          </button>
                          <button
                            className="px-4 py-2 flex items-center text-white bg-red-800 hover:bg-red-600 rounded"
                            onClick={() => setConfirmDeleteId(category.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Delete Confirmation  */}
          {confirmDeleteId && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
                <p className="mb-4">
                  Are you sure you want to delete this Store?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-700"
                    onClick={() => handleDeleteCategory(confirmDeleteId)}
                  >
                    Yes, Delete
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-700"
                    onClick={() => setConfirmDeleteId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1}to{" "}
              {Math.min(indexOfLastItem, filteredData.length)} of{" "}
              {filteredData.length} entries
            </p>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 text-sm text-white bg-blue-900 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-900 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500"
                    : "bg-blue-900 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCategories;