// import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import apiClient from "../api/apiConfig";

const Bikes = () => {
  const [data, setData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formVisible, setFormVisible] = useState(false); //FORM State
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  // const [currentBike, setCurrentBike] = useState(null);
  const [formData, setFormData] = useState({
    brandName: "",
    category: "",
    modelName: "",
    vehicleRegistrationNumber: "",
    addedBy: "",
    registrationYear: "",
    vehicleChassisNumber: "",
    vehicleEngineNumber: "",
    storeName: "",
    puc: "",
    insurance: "",
    document: "",
    vehicleImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState(5);

  // Fetch Bike data
  useEffect(() => {
    const fetchBikes = async () => {
      setLoading(true);
      //comman api fetch
      try {
        const response = await apiClient.get("/bikes/list")
        setData(response.data);
        setStatuses(
          response.data.map((item) => ({ id: item.id, status: "Active" }))
        );
      } catch (error) {
        console.error("Error Fetching Bike Data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBikes();
  }, []);

  // Add Bike
  const handleAddBike = (e) => {
    e.preventDefault();

    apiClient
      .post("/bikes/save", formData)
      .then((response) => {
        setData([...data, response.data]);
        resetForm();
      })
      .catch((error) => ("Error Addding Bike Data", error));
  };

  //Save Edit Bike
  const handleSaveEdit = (e) => {
    e.preventDefault();
    apiClient
      .put(`/bikes/${editingId}`, formData)
      .then((response) => {
        setData(
          data.map((bike) => (bike.id === editingId ? response.data : bike))
        );
        resetForm();
      })
      .catch((error) => console.error("Erro Saving Data:", error));
  };

  // Edit Bike
  const handleEditBike = (bike) => {
    setEditingId(bike.id);
    setFormData({
      brandName: bike.brandName,
      category: bike.category,
      modelName: bike.modelName,
      vehicleRegistrationNumber: bike.vehicleRegistrationNumber,
      addedBy: bike.addedBy,
      registrationYear: bike.registrationYear,
      vehicleChassisNumber: bike.vehicleChassisNumber,
      vehicleEngineNumber: bike.vehicleEngineNumber,
      storeName: bike.storeName,
      puc: bike.puc,
      insurance: bike.insurance,
      document: bike.document,
      vehicleImage: bike.vehicleImage,
    });
    setFormVisible(true);
  };

  //Delete Store
  const handleDeleteBike = (id) => {
    apiClient
      .delete(`/bikes/${id}`)
      .then(() => setData(data.filter((bike) => bike.id !== id)))
      .catch((error) => console.error("Error deleting data:", error))
      .finally(() => setConfirmDeleteId(null));
  };

  //Reset Form
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      brandName: "",
      category: "",
      modelName: "",
      vehicleRegistrationNumber: "",
      addedBy: "",
      registrationYear: "",
      vehicleChassisNumber: "",
      vehicleEngineNumber: "",
      storeName: "",
      puc: "",
      insurance: "",
      document: "",
      vehicleImage: "",
    });
    setFormVisible(false);
  };

  // Filtered data based on search query
  const filteredData = data.filter((item) =>
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
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
        <h1 className="text-2xl font-bold text-gray-800">All Bike List</h1>
        {!formVisible && (
          <button
            onClick={() => setFormVisible(true)}
            // onClick={handleAddBike}
            className="px-4 py-2 bg-blue-900 text-white rounded-r hover:bg-blue-600"
          >
            + Add Bike
          </button>
        )}
      </div>

      {/* Form  */}

      {formVisible ? (
        <div className="p-6 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Bike" : "Add New Bike"}
          </h2>
          <form onSubmit={editingId ? handleSaveEdit : handleAddBike}>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="font-medium">Brand Name *</label>
                <input
                  type="text"
                  name="brandName"
                  placeholder="Enter Bike Brand"
                  value={formData.brandName}
                  onChange={(e) =>
                    setFormData({ ...formData, brandName: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="font-medium">Category Name *</label>
                <input
                  type="text"
                  name="category"
                  placeholder="Enter Category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="font-medium">Model Name *</label>
                <input
                  type="text"
                  name="modelName"
                  placeholder="Enter Model Name"
                  value={formData.modelName}
                  onChange={(e) =>
                    setFormData({ ...formData, modelName: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="font-medium">
                  Vehicle Registration Number *
                </label>
                <input
                  type="text"
                  name="vehicleRegistrationNumber"
                  placeholder="Enter Vehicle Registration Number"
                  value={formData.vehicleRegistrationNumber}
                  onChange={(e) =>
                    setFormData({...formData, vehicleRegistrationNumber: e.target.value})
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="font-medium">Registration Year *</label>
                <input
                  type="text"
                  name="registrationYear"
                  placeholder="Enter Registration Year"
                  value={formData.registrationYear}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationYear: e.target.value
                    })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="font-medium">Vehicle Chassis Number *</label>
                <input
                  type="text"
                  name="vehicleChassisNumber"
                  placeholder="Enter Vehicle Chassis Number"
                  value={formData.vehicleChassisNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vehicleChassisNumber: e.target.value
                    })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="font-medium">Vehicle Engine Number *</label>
                <input
                  type="text"
                  name="vehicleEngineNumber"
                  placeholder="Enter Vehicle Engine Number"
                  value={formData.vehicleEngineNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vehicleEngineNumber: e.target.value,
                    })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="font-medium">Store Name *</label>
                <input
                  type="text"
                  name="storeName"
                  placeholder="Enter storeName"
                  value={formData.storeName}
                  onChange={(e) =>
                    setFormData({ ...formData, storeName: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">Upload PUC</label>
                <input
                  type="file"
                  name="puc"
                  className="w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      puc: e.target.files[0],
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Upload Insurance
                </label>
                <input
                  type="file"
                  name="insurance"
                  className="w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      insurance: e.target.files[0],
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Upload Document
                </label>
                <input
                  type="file"
                  name="document"
                  className="w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      document: e.target.files[0],
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Upload Vehicle Images *
                </label>
                <input
                  type="file"
                  name="vehicleImage"
                  className="w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vehicleImage: e.target.files[0],
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600"
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

          {/* Table */}

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Brand Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Model Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Vehicle Registration Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Added By
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
                      Loading...
                    </td>
                  </tr>
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No data Found
                    </td>
                  </tr>
                ) : (
                  currentData.map((bike) => (
                    <tr
                      key={bike.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">{bike.id}</td>
                      <td className="px-6 py-4">{bike.brandName}</td>
                      <td className="px-6 py-4">{bike.category}</td>
                      <td className="px-6 py-4">{bike.modelName}</td>
                      <td className="px-6 py-4">{bike.vehicleRegistrationNumber}</td>
                      <td className="px-6 py-4">{bike.addedBy}</td>
                      <td className="px-6 py-4">
                        <button
                          className={`px-2 py-1 rounded ${
                            statuses.find((row) => row.id === bike.id)
                              ?.status === "Active"
                              ? "bg-green-600 hover:bg-green-600 text-white"
                              : "bg-red-700 hover:bg-red-600 text-white"
                          }`}
                          onClick={() => toggleStatus(bike.id)}
                        >
                          {statuses.find((row) => row.id === bike.id)?.status ??
                            "Active"}
                        </button>
                      </td>

                      <td className="px-6 py-4 ">
                        <button
                          onClick={() => handleEditBike(bike)}
                          className="px-4 py-2 flex items-center text-white bg-blue-800 hover:bg-blue-600 rounded mr-2"
                        >
                          <FaEdit className="mr-2" />
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 text-white bg-red-800 hover:bg-red-600 rounded"
                          onClick={() => setConfirmDeleteId(bike.id)}
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
                    onClick={() => handleDeleteBike(confirmDeleteId)}
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

export default Bikes;
