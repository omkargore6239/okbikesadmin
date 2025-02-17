// import apiClient from "apiClient";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import apiClient from "../api/apiConfig";

const AllOffers = () => {
  const [data, setData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formVisible, setFormVisible] = useState(false); // Form state
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    offerName: " ",
    couponCode: " ",
    discountType: " ",
    discountValue: " ",
    minimumRideAmount: " ",
    offerStartDateTime: " ",
    offerEndDateTime: " ",
    customerEligibility: " ",
    usageLimitPerCustomer: " ",
    totalCoupon: " ",
    remainingCoupon: " "
  });
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState(5);

  //Fetch offers data
  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(
          "/offers/list")
        setData(response.data);
        setStatuses(
          response.data.map((item) => ({ id: item.id, status: "Active" }))
        );
      } catch (error) {
        console.error("Error fetchig store data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  //Add offers
  const handledAddOffer = (e) => {
    e.preventDefault();

    apiClient
      .post("/offers/save", formData)
      .then((response) => {
        setData([...data, response.data]);
        resetForm();
      })
      .catch((error) => console.error("Error adding offer data", error));
  };

  //Save Edit
  const handleSaveEditOffer = (e) => {
    e.preventDefault();
    apiClient
      .put(`/offers/${editingId}`, formData)
      .then((response) => {
        setData(
          data.map((offer) => (offer.id === editingId ? response.data : offer))
        );
        resetForm();
      })
      .catch((error) => console.error("Error Saving Data:", error));
  };

  //Edit Offer
  const handleEditOffer = (offer) => {
    setEditingId(offer.id);
    setFormData({
      offerName: offer.offerName,
      couponCode: offer.couponCode,
      discountType: offer.discountType,
      discountValue: offer.discountValue,
      minimumRideAmount: offer.minimumRideAmount,
      offerStartDateTime: offer.offerStartDateTime,
      offerEndDateTime: offer.offerEndDateTime,
      customerEligibility: offer.customerEligibility,
      usageLimitPerCustomer: offer.usageLimitPerCustomer,
      totalCoupon: offer.totalCoupon,
      remainingCoupon: offer.remainingCoupon,
      totalUsageLimit: offer.totalUsageLimit,
    });
    setFormVisible(true);
  };

  //Delete Offer
  const handleDeleteOffer = (id) => {
    apiClient
      .delete(`/offers/${id}`)
      .then(() => setData(data.filter((offer) => offer.id !== id)))
      .catch((error) => console.error("Error deleting data:", error))
      .finally(() => setConfirmDeleteId(null));
  };

  //Reset Form
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      offerName: " ",
      couponCode: " ",
      discountType: " ",
      discountValue: " ",
      minimumRideAmount: " ",
      offerStartDateTime: " ",
      offerEndDateTime: " ",
      customerEligibility: " ",
      usageLimitPerCustomer: " ",
      remainingCoupon: " "
    });
    setFormVisible(false);
  };

  // Filtered data based on search query
  const filteredData = data.filter(
    (item) => item.offerName.toLowerCase().includes(searchQuery.toLowerCase()) // Fix here
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
        <h1 className="text-2xl font-bold text-gray-800">All Offer List</h1>
        {!formVisible && (
          <button
            onClick={() => setFormVisible(true)}
            className="px-4 py-2 bg-blue-900 text-white rounded-r hover:bg-blue-600"
          >
            + Add Offer
          </button>
        )}
      </div>

      {/* formVisible */}
      {formVisible ? (
        // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Offer" : "Add New Offer"}
          </h2>
          <form onSubmit={editingId ? handleSaveEditOffer : handledAddOffer}>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="font-medium">Offer Name</label>
                <input
                  type="text"
                  name="offerName"
                  placeholder="Enter Offer Name"
                  className="border p-2 rounded w-full"
                  value={formData.offerName}
                  onChange={(e) =>
                    setFormData({ ...formData, offerName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Coupon Code</label>
                <input
                  type="text"
                  name="couponCode"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.couponCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      couponCode: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Discount Type</label>
                <input
                  type="text"
                  name="address"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.discountType}
                  onChange={(e) =>
                    setFormData({ ...formData, discountType: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Discount Value</label>
                <input
                  type="text"
                  name="discountValue"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.discountValue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discountValue: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Applied To</label>
                <input
                  type="text"
                  name="appliedTo"
                  className="w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      appliedTo: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Minimum Ride Amount
                </label>
                <input
                  type="text"
                  name="minimumRideAmount"
                  className="w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minimumRideAmount: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Offer Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="offerStartDateTime"
                  className="w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    setFormData({
                      ...setFormData,
                      offerStartDateTime: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Offer End Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="offerEndDateTime"
                  className="w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    setFormData({
                      ...setFormData,
                      offerEndDateTime: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Customer Eligibility
                </label>
                <select
                  name="customerEligibility"
                  className="w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customerEligibility: e.target.value,
                    })
                  }
                >
                  <option value="Everyone">Everyone</option>
                  <option value="Specific Customer">Specific Customer</option>
                </select>
                {formData.customerEligibility === "Specific Customer" && (
                  <input
                    type="text"
                    name="specificCustomer"
                    placeholder="Enter Customer ID or Email"
                    className="mt-2 w-full border border-gray-300 p-2 rounded"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specificCustomer: e.target.value,
                      })
                    }
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">Usage Limits</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="limitDiscountUsage"
                    className="mr-2"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        limitDiscountUsage: e.target.checked,
                      })
                    }
                  />
                  <span>Limit number of times this discount can be used</span>
                </div>
                {formData.limitDiscountUsage && (
                  <input
                    type="number"
                    name="totalCoupon"
                    placeholder="Enter Limit"
                    className="mt-2 w-full border border-gray-300 p-2 rounded"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalCoupon: e.target.value,
                      })
                    }
                  />
                )}
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    name="limitToOneUsePerCustomer"
                    className="mr-2"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        limitToOneUsePerCustomer: e.target.checked,
                      })
                    }
                  />
                  <span>Limit to only one use per customer</span>
                </div>
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
        // </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          {/* Search Bar */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search by offer Name..."
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
                    Offer Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Coupon Code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Coupons
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Remaining Coupons
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
                  currentData.map((offer) => (
                    <tr
                      key={offer.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">{offer.id}</td>
                      <td className="px-6 py-4">{offer.offerName}</td>
                      <td className="px-6 py-4">{offer.couponCode}</td>
                      <td className="px-6 py-4">{offer.discountValue}</td>
                      <td className="px-6 py-4">{offer.totalCoupon}</td>
                      <td className="px-6 py-4">{offer.remainingCoupon}</td>
                      
                      <td className="px-6 py-4">
                        <button
                          className={`px-2 py-1 rounded ${
                            statuses.find((row) => row.id === offer.id)
                              ?.status === "Active"
                              ? "bg-green-600 hover:bg-green-600 text-white"
                              : "bg-red-700 hover:bg-red-600 text-white"
                          }`}
                          onClick={() => toggleStatus(offer.id)}
                        >
                          {statuses.find((row) => row.id === offer.id)
                            ?.status ?? "Active"}
                        </button>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          className="px-4 py-2 flex items-center text-white bg-blue-800 hover:bg-blue-600 rounded mr-2"
                          onClick={() => handleEditOffer(offer)}
                        >
                          <FaEdit className="mr-2" />
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 text-white bg-red-800 hover:bg-red-600 rounded"
                          onClick={() => setConfirmDeleteId(offer.id)}
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
                    onClick={() => handleDeleteOffer(confirmDeleteId)}
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

export default AllOffers;
