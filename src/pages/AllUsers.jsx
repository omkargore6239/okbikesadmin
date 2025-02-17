import React, { useState } from "react";

const AllUsers = () => {
  // Sample Data
  const initialData = [
    { id: 1, email: "new@gmail.com", name: "H$$H%", contactNumber: "9396969696" },
    { id: 2, email: "new@gmail.com", name: "H$$H%", contactNumber: "9396969696" },
    { id: 3, email: "new@gmail.com", name: "H$$H%", contactNumber: "9396969696" },
    { id: 4, email: "new@gmail.com", name: "H$$H%", contactNumber: "9396969696" },
    { id: 5, email: "new@gmail.com", name: "H$$H%", contactNumber: "9396969696" },
    { id: 6, email: "new@gmail.com", name: "H$$H%", contactNumber: "9396969696" },
    { id: 7, email: "new@gmail.com", name: "H$$H%", contactNumber: "9396969696" },
  ];

  const [statuses, setStatuses] = useState(
    initialData.map((item) => ({ id: item.id, status: "Active" }))
  );
  const [verifications, setVerifications] = useState(
    initialData.map((item) => ({ id: item.id, verify: "Unverified" }))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtered data based on search query
  const filteredData = initialData.filter((item) =>
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
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

  // Toggle verify function
  const toggleVerify = (id) => {
    setVerifications((prevVerifications) =>
      prevVerifications.map((row) =>
        row.id === id
          ? { ...row, verify: row.verify === "Verified" ? "Unverified" : "Verified" }
          : row
      )
    );
  };

  // Delete function
  const handleDelete = (id) => {
    setStatuses((prevStatuses) => prevStatuses.filter((row) => row.id !== id));
    setVerifications((prevVerifications) =>
      prevVerifications.filter((row) => row.id !== id)
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Users</h1>
        <button className="px-4 py-2 bg-blue-900 text-white rounded-r hover:bg-blue-600">
          + Add New User
        </button>
      </div>

      {/* Table */}
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
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email ID</th>
                <th scope="col" className="px-6 py-3">Contact Number</th>
                <th scope="col" className="px-6 py-3">Verify</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => {
                const rowStatus = statuses.find((status) => status.id === item.id)?.status;
                const rowVerify = verifications.find((verify) => verify.id === item.id)?.verify;
                return (
                  <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.id}
                    </th>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4">{item.contactNumber}</td>
                    <td className="px-6 py-4">
                      <button
                        className={`px-4 py-2 text-white rounded ${
                          rowVerify === "Verified"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                        onClick={() => toggleVerify(item.id)}
                      >
                        {rowVerify}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className={`px-4 py-2 text-white rounded ${
                          rowStatus === "Active"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                        onClick={() => toggleStatus(item.id)}
                      >
                        {rowStatus}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-4 py-2 text-white bg-blue-900 hover:bg-blue-600 rounded mr-2">
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
        </p>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 text-sm text-white bg-blue-900 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-blue-900 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
