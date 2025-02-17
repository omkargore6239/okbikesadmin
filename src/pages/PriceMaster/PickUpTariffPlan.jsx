

import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import apiClient from "../../api/apiConfig";

const PickUpTariffPlan = () => {
  const [data, setData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formVisible, setFormVisible] = useState(false); // Form state
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    vehicleCategoryName: "",
    days: "",
    price: "",
    depositeAmount: "",
  });
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  //Fetch Prices
  useEffect(() => {
    const fetchPickUpTariffPrices = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(
          "/pickuptariffplan/price/list"
        );
        setData(response.data);
        setStatuses(
          response.data.map((item) => ({ id: item.id, status: "Active" }))
        );
      } catch (error) {
        console.error("Error fetching Pick Up Tariff Price", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPickUpTariffPrices();
  }, []);

  //Add Price in tariff plan
  const handleAddPrice = (e) => {
    e.preventDefault();

    apiClient
      .post("/pickuptariffplan/price/save", formData)
      .then((response) => {
        setData([...data, response.data]);
        resetForm();
      })
      .catch((error) =>
        console.error("Error adding pick up tariff plan", error)
      );
  };

  // Save Tariff Price
  const handleSaveEdit = (e) => {
    e.preventDefault();
    apiClient
      .put(
        `/pickuptariffplan/price/${editingId}`.formData
      )
      .then((response) => {
        setData(
          data.map((pickUpTariffplan) =>
            pickUpTariffplan.id === editingId ? response.data : pickUpTariffplan
          )
        );
        resetForm();
      })
      .catch((error) => console.error("Error Saving Data:", error));
  };

  //Edit Tariff plan
  const handleEditTariffPlan = (pickuptariffplan) => {
    setEditingId(pickuptariffplan.id);
    setFormData({
      vehicleCategoryName: pickuptariffplan.vehicleCategoryName,
      days: pickuptariffplan.days,
      price: pickuptariffplan.price,
      depositeAmount: pickuptariffplan.depositeAmount,
    });
    setFormVisible(true);
  };

  //Reset Form
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      vehicleCategoryName: "",
      days: "",
      price: "",
      depositeAmount: "",
    });
    setFormVisible(false);
  };

  // Filtered data based on search query
  const filteredData = data.filter((item) =>
    item.vehicleCategoryName.toLowerCase().includes(searchQuery.toLowerCase())
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
        <h1 className="text-2xl font-bold text-gray-800">All Price List</h1>
        {!formVisible && (
          <button
            onClick={() => setFormVisible(true)}
            className="px-4 py-2 bg-blue-900 text-white rounded-r hover:bg-blue-600"
          >
            + Add Price
          </button>
        )}
      </div>

      {/* FormVisible */}
      {formVisible ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit PickUpTariffPlan" : " Add New PickUpTariffPlan"}
          </h2>
          <form onSubmit={editingId ? handleSaveEdit : handleAddPrice}>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="font-medium">Select Category *</label>
                <input
                  text="text"
                  name="vehicleCategoryName"
                  placeholder="Enter Vehicle Category"
                  className="border p-2 rounded w-full"
                  value={formData.vehicleCategoryName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vehicleCategoryName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">No. of Days</label>
                <input
                  type="number"
                  name="days"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.days}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      days: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Amount</label>
                <input
                  type="number"
                  name="price"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Deposit Amount</label>
                <input
                  type="number"
                  name="depositeAmount"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.depositeAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      depositeAmount: e.target.value,
                    })
                  }
                  required
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

          {/* Table */}
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Vehicle Category Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Days
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Deposit
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
                  currentData.map((pickuptariffplan) => (
                    <tr
                      key={pickuptariffplan.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">{pickuptariffplan.id}</td>
                      <td className="px-6 py-4">
                        {pickuptariffplan.vehicleCategoryName}
                      </td>
                      <td className="px-6 py-4">{pickuptariffplan.days}</td>
                      <td className="px-6 py-4">{pickuptariffplan.price}</td>
                      <td className="px-6 py-4">
                        {pickuptariffplan.depositeAmount}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className={`px-2 py-1 rounded ${
                            statuses.find(
                              (row) => row.id === pickuptariffplan.id
                            )?.status === "Active"
                              ? "bg-green-600 hover:bg-green-600 text-white"
                              : "bg-red-700 hover:bg-red-600 text-white"
                          }`}
                          onClick={() => toggleStatus(pickuptariffplan.id)}
                        >
                          {statuses.find((row) => row.id === pickuptariffplan.id)
                            ?.status ?? "Active"}
                        </button>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          className="px-4 py-2 flex items-center text-white bg-blue-800 hover:bg-blue-600 rounded mr-2"
                          onClick={() => handleEditTariffPlan(pickuptariffplan)}
                        >
                          <FaEdit className="mr-2" />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

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

export default PickUpTariffPlan;
