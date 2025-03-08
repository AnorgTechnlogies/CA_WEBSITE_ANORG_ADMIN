// ViewDeductionRecord.jsx
import { Card, CardHeader, CardBody, Typography, Select, Option } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import { getGrampanchayatById } from "@/store/slices/grampanchayatSlice";
import { getAllDeductions, clearAllPaymentDocumentErrors, clearPaymentDocumentMessage } from "../../store/slices/forAllDataAccesInOneFrameSlice";

export function ViewDeductionRecord() {
  const { loading, error, message, allDeductions, pagination, summary } = useSelector((state) => state.paymentDocuments);
  const { gpId } = useParams();
  const dispatch = useDispatch();
  const { singleGrampanchayat } = useSelector((state) => state.grampanchayat);
  
  // Filtering and pagination state
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    gstNo: "",
    paymentMode: "",
    seenByAdmin: "",
    sortBy: "date",
    sortOrder: "desc"
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (gpId) {
      dispatch(getGrampanchayatById(gpId));
      loadDeductions();
    }
  }, [dispatch, gpId, currentPage]);

  const loadDeductions = () => {
    dispatch(getAllDeductions(gpId, filters, currentPage, 10));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters
  const applyFilters = () => {
    setCurrentPage(1);
    loadDeductions();
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      gstNo: "",
      paymentMode: "",
      seenByAdmin: "",
      sortBy: "date",
      sortOrder: "desc"
    });
    setCurrentPage(1);
    dispatch(getAllDeductions(gpId, {}, 1, 10));
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Toast handling
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllPaymentDocumentErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearPaymentDocumentMessage());
    }
  }, [error, message, dispatch]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Card className="shadow-xl rounded-xl">
        <CardHeader variant="gradient" className="p-6 m-0 bg-[#02557a]">
          <Typography variant="h5" color="white" className="font-medium">
            Deduction Records
          </Typography>
        </CardHeader>
        
        {loading && (
          <div className="flex justify-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ee792d]"></div>
          </div>
        )}
        
        {singleGrampanchayat && (
          <div className="bg-white shadow-md rounded-lg p-6 m-6 border border-gray-200">
            <h1 className="text-[#02557a] font-bold mb-2">Grampanchayat Details</h1>
            <h2 className="text-2xl font-semibold text-[#ee792d] mb-3">{singleGrampanchayat.data.grampanchayat}</h2>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-[#02557a]">Location:</span>{" "}
              {`${singleGrampanchayat.data.grampanchayat}, ${singleGrampanchayat.data.tahsil}, ${singleGrampanchayat.data.district}`}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-[#02557a]">State:</span> {singleGrampanchayat.data.state}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-[#02557a]">Contact:</span> {singleGrampanchayat.data.gpMobileNumber}
            </p>
          </div>
        )}
        
        <CardBody className="p-6">
          {/* Filters */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-[#02557a] mb-3">Filter Deductions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                <input
                  type="text"
                  name="gstNo"
                  value={filters.gstNo}
                  onChange={handleFilterChange}
                  placeholder="Search by GST No"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                <select
                  name="paymentMode"
                  value={filters.paymentMode}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All</option>
                  <option value="online">Online</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seen Status</label>
                <select
                  name="seenByAdmin"
                  value={filters.seenByAdmin}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All</option>
                  <option value="true">Seen</option>
                  <option value="false">Unseen</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="date">Date</option>
                  <option value="totalAmount">Amount</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-[#02557a] text-white rounded-md hover:bg-[#023e59] transition"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
              >
                Reset
              </button>
            </div>
          </div>
          
          {/* Summary Section */}
          {summary && (
            <div className="bg-white shadow-md rounded-lg p-4 mb-6 border border-gray-200">
              <h3 className="text-lg font-medium text-[#02557a] mb-3">Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600">Total GST</p>
                  <p className="text-lg font-semibold">{formatCurrency(summary.totalGST)}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600">Total Royalty</p>
                  <p className="text-lg font-semibold">{formatCurrency(summary.totalRoyalty)}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600">Total IT</p>
                  <p className="text-lg font-semibold">{formatCurrency(summary.totalIT)}</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600">Total Kamgaar</p>
                  <p className="text-lg font-semibold">{formatCurrency(summary.totalKamgaar)}</p>
                </div>
                <div className="bg-red-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600">Total Insurance</p>
                  <p className="text-lg font-semibold">{formatCurrency(summary.totalInsurance)}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm text-gray-600">Grand Total</p>
                  <p className="text-lg font-semibold text-[#ee792d]">{formatCurrency(summary.grandTotal)}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Deductions Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-gray-200 bg-gray-50 p-4 text-black font-semibold">Date</th>
                  <th className="border-b border-gray-200 bg-gray-50 p-4 text-black font-semibold">GST No.</th>
                  <th className="border-b border-gray-200 bg-gray-50 p-4 text-black font-semibold">Payment Mode</th>
                  <th className="border-b border-gray-200 bg-gray-50 p-4 text-black font-semibold">Total Amount</th>
                  <th className="border-b border-gray-200 bg-gray-50 p-4 text-black font-semibold">Status</th>
                  <th className="border-b border-gray-200 bg-gray-50 p-4 text-black font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {allDeductions && allDeductions.length > 0 ? (
                  allDeductions.map((deduction, index) => (
                    <tr key={deduction._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-4">{new Date(deduction.date).toLocaleDateString()}</td>
                      <td className="p-4">{deduction.gstNo}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          deduction.paymentMode === 'online' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {deduction.paymentMode.charAt(0).toUpperCase() + deduction.paymentMode.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">{formatCurrency(deduction.totalAmount)}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          deduction.seenByAdmin ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {deduction.seenByAdmin ? 'Seen' : 'Unseen'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            // This would typically open a modal with deduction details
                            // For now, we'll just show an alert with basic info
                            alert(`
                              Deduction ID: ${deduction._id}
                              GST Entries: ${deduction.gstEntries?.length || 0}
                              Royalty Entries: ${deduction.royaltyEntries?.length || 0}
                              IT Entries: ${deduction.itEntries?.length || 0}
                              Kamgaar Entries: ${deduction.kamgaarEntries?.length || 0}
                              Insurance Entries: ${deduction.insuranceEntries?.length || 0}
                            `);
                          }}
                          className="px-3 py-1 bg-[#02557a] text-white rounded-md hover:bg-[#023e59] transition text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No deductions found. Try adjusting your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {pagination && pagination.total > 0 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.limit + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(pagination.currentPage * pagination.limit, pagination.total)}
                </span>{" "}
                of <span className="font-medium">{pagination.total}</span> results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={!pagination.hasPrevPage}
                  className={`px-3 py-1 rounded-md ${
                    pagination.hasPrevPage
                      ? "bg-[#02557a] text-white hover:bg-[#023e59]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  } transition`}
                >
                  Previous
                </button>
                <span className="px-3 py-1 bg-gray-100 rounded-md">
                  {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={!pagination.hasNextPage}
                  className={`px-3 py-1 rounded-md ${
                    pagination.hasNextPage
                      ? "bg-[#02557a] text-white hover:bg-[#023e59]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  } transition`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
        toastStyle={{ 
          backgroundColor: '#ffffff',
          color: '#000000',
          borderLeft: '5px solid #ee792d'
        }}
      />
    </div>
  );
}

export default ViewDeductionRecord;