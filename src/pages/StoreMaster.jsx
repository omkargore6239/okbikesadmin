import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import apiClient from "../api/apiConfig";

const StoreMaster = () => {
  const [data, setData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    storeName: "",
    storeContactNumber: "",
    address: "",
    storeGoogleMapUrl: "",
    storeImage: null,
  });
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch store data
  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/stores/list");
        setData(response.data);
        setStatuses(
          response.data.map((item) => ({ id: item.id, status: "Active" }))
        );
      } catch (error) {
        setErrorMessage("Error fetching store data.");
        console.error("Error fetching store data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  // Add or Edit Store
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append the form fields to FormData object
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      setLoading(true);
      let response;
      if (editingId) {
        response = await apiClient.put(`/stores/${editingId}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setData(
          data.map((store) => (store.id === editingId ? response.data : store))
        );
      } else {
        response = await apiClient.post("/stores/save", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setData([...data, response.data]);
      }
      resetForm();
    } catch (error) {
      setErrorMessage("Error saving store data.");
      console.error("Error saving store data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Store
  const handleDeleteStore = async (id) => {
    try {
      setLoading(true);
      await apiClient.delete(`/stores/${id}`);
      setData(data.filter((store) => store.id !== id));
    } catch (error) {
      setErrorMessage("Error deleting store.");
      console.error("Error deleting store:", error);
    } finally {
      setConfirmDeleteId(null);
      setLoading(false);
    }
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      storeName: "",
      storeContactNumber: "",
      address: "",
      storeGoogleMapUrl: "",
      storeImage: null,
    });
    setFormVisible(false);
  };

  // Filtered data based on search query
  const filteredData = data.filter((item) =>
    item.storeName.toLowerCase().includes(searchQuery.toLowerCase())
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
        <h1 className="text-2xl font-bold text-gray-800">Store List</h1>
        {!formVisible && (
          <button
            onClick={() => setFormVisible(true)}
            className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600"
          >
            + Add Store
          </button>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-200 text-red-700 p-4 mb-4 rounded">
          <strong>Error: </strong> {errorMessage}
        </div>
      )}

      {/* Form Section */}
      {formVisible ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Store" : "Add New Store"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  placeholder="Enter Store Name"
                  className="border p-2 rounded w-full"
                  value={formData.storeName}
                  onChange={(e) =>
                    setFormData({ ...formData, storeName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="font-medium">Contact Number</label>
                <input
                  type="text"
                  name="storeContactNumber"
                  className="border p-2 rounded w-full"
                  value={formData.storeContactNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, storeContactNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  className="border p-2 rounded w-full"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="font-medium">Google Map URL</label>
                <input
                  type="url"
                  name="storeGoogleMapUrl"
                  className="border p-2 rounded w-full"
                  value={formData.storeGoogleMapUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, storeGoogleMapUrl: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="font-medium">Store Image</label>
                <input
                  type="file"
                  name="storeImage"
                  className="border p-2 rounded w-full"
                  onChange={(e) =>
                    setFormData({ ...formData, storeImage: e.target.files[0] })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-600"
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
            <input
              type="text"
              placeholder="Search by Store Name..."
              className="border p-2 rounded w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Store Image</th>
                  <th scope="col" className="px-6 py-3">Store Name</th>
                  <th scope="col" className="px-6 py-3">Contact Number</th>
                  <th scope="col" className="px-6 py-3">Address</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">Loading...</td>
                  </tr>
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">No data found</td>
                  </tr>
                ) : (
                  currentData.map((store) => (
                    <tr key={store.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{store.id}</td>
                      <td className="px-6 py-4">{store.storeImage}</td>
                      <td className="px-6 py-4">{store.storeName}</td>
                      <td className="px-6 py-4">{store.storeContactNumber}</td>
                      <td className="px-6 py-4">
                        <a
                          href={store.storeGoogleMapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {store.address}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className={`px-2 py-1 rounded ${
                            statuses.find((row) => row.id === store.id)?.status === "Active"
                              ? "bg-green-600 hover:bg-green-600 text-white"
                              : "bg-red-600 hover:bg-red-600 text-white"
                          }`}
                          onClick={() => toggleStatus(store.id)}
                        >
                          {statuses.find((row) => row.id === store.id)?.status}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setFormVisible(true);
                            setEditingId(store.id);
                            setFormData({
                              storeName: store.storeName,
                              storeContactNumber: store.storeContactNumber,
                              address: store.address,
                              storeGoogleMapUrl: store.storeGoogleMapUrl,
                              storeImage: store.storeImage,
                            });
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(store.id)}
                          className="ml-4 text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredData.length > itemsPerPage && (
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Prev
              </button>
              <span>{currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StoreMaster;
