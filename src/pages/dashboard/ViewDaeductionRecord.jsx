import { Card, CardHeader, CardBody, Typography, Select, Option, Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import { getGrampanchayatById } from "@/store/slices/grampanchayatSlice";
import { getAllDeductions, updateDeductionByAdmin, clearAllPaymentDocumentErrors, clearPaymentDocumentMessage } from "../../store/slices/forAllDataAccesInOneFrameSlice";

export function ViewDeductionRecord() {
  const { loading, error, message, allDeductions, pagination, summary, updateLoading } = useSelector((state) => state.paymentDocuments);
  const { gpId } = useParams();
  const dispatch = useDispatch();
  const { singleGrampanchayat } = useSelector((state) => state.grampanchayat);

  // State for modal and selected deduction
  const [selectedDeduction, setSelectedDeduction] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // State for admin actions form data
  const [seenByAdminForm, setSeenByAdminForm] = useState(false);
  const [documentFile, setDocumentFile] = useState(null);

  // Handle view details click
  const handleViewDetails = (deduction) => {
    setSelectedDeduction(deduction);
    setOpenModal(true);
  };

  // Close modal handler
  const handleCloseModal = () => {
    setOpenModal(false);
    // Don't clear the selected deduction immediately to prevent UI flashing
    setTimeout(() => {
      setSelectedDeduction(null);
    }, 300);
  };

  // Synchronize form data with selected deduction
  useEffect(() => {
    if (selectedDeduction) {
      setSeenByAdminForm(selectedDeduction.seenByAdmin);
      setDocumentFile(null);
    }
  }, [selectedDeduction]);

  // Handle form submission for admin actions
  const handleSubmit = async () => {
    if (!selectedDeduction) return;
    
    const { _id } = selectedDeduction;
    const form = new FormData();
    form.append('seenByAdmin', seenByAdminForm ? 'true' : 'false');
    if (documentFile) {
      form.append('recieptByAdmin', documentFile);
    }
    
    try {
      await dispatch(updateDeductionByAdmin(_id, form));
      // Don't close modal immediately, let the success message show
      // The modal will close after successful update via useEffect below
    } catch (error) {
      console.error(error);
    }
  };

  // Close modal after successful update
  useEffect(() => {
    if (message && openModal) {
      // Add a delay before closing to allow the user to see the success message
      setTimeout(() => {
        handleCloseModal();
        // Reload deductions to show updated data
        loadDeductions();
      }, 1500);
    }
  }, [message, openModal]);

  // Filtering and pagination state
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    gramadhikariName: "",
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
      gramadhikariName: "",
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

  // Helper function to render deduction entries
  const renderEntries = (entries, title, showPAN = false) => {
    if (!entries || entries.length === 0) return null;

    return (
      <div className="mb-4">
        <h4 className="font-semibold text-[#02557a] mb-2">{title} ({entries.length} entries)</h4>
        <div className="space-y-2">
          {entries.map((entry, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm">
                <span className="font-medium">Party:</span> {entry.partyName}
                {showPAN && entry.pan && <span className="ml-2">(PAN: {entry.pan})</span>}
              </p>
              <p className="text-sm">
                <span className="font-medium">Amount:</span> {formatCurrency(entry.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Gram Adhikari Name</label>
                <input
                  type="text"
                  name="gramadhikariName"
                  value={filters.gramadhikariName}
                  onChange={handleFilterChange}
                  placeholder="Search by Gram Adhikari Name"
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
                  <th className="border-b border-gray-200 bg-gray-50 p-4 text-black font-semibold">Gram Adhikari Name</th>
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
                      <td className="p-4">{deduction.gramadhikariName}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${deduction.paymentMode === 'online' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                          {deduction.paymentMode.charAt(0).toUpperCase() + deduction.paymentMode.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">{formatCurrency(deduction.totalAmount)}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${deduction.seenByAdmin ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {deduction.seenByAdmin ? 'Seen' : 'Unseen'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleViewDetails(deduction)}
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

          {/* Details Modal - Moved outside of the table */}
          <Dialog 
            open={openModal} 
            handler={handleCloseModal} 
            size="xl"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <DialogHeader className="bg-[#02557a] text-white p-4">
              Deduction Details
              <button onClick={handleCloseModal} className="absolute right-4 top-4 text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </DialogHeader>
            <DialogBody className="max-h-[80vh] overflow-y-auto">
              {selectedDeduction && (
                <div className="space-y-4">
                  {/* Main Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-medium text-[#02557a]">Date:</p>
                      <p>{new Date(selectedDeduction.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#02557a]">Gramadhikari Name:</p>
                      <p>{selectedDeduction.gramadhikariName}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#02557a]">Payment Mode:</p>
                      <p className="capitalize">{selectedDeduction.paymentMode}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#02557a]">Total Amount:</p>
                      <p className="font-semibold text-[#ee792d]">{formatCurrency(selectedDeduction.totalAmount)}</p>
                    </div>
                    {selectedDeduction.checkNo && (
                      <div>
                        <p className="font-medium text-[#02557a]">Check Number:</p>
                        <p>{selectedDeduction.checkNo}</p>
                      </div>
                    )}
                    {selectedDeduction.pfmsDate && (
                      <div>
                        <p className="font-medium text-[#02557a]">PFMS or Check Date:</p>
                        <p>{new Date(selectedDeduction.pfmsDate).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>

                  {/* Deduction Entries */}
                  {renderEntries(selectedDeduction.gstEntries, "GST Entries")}
                  {renderEntries(selectedDeduction.royaltyEntries, "Royalty Entries")}
                  {renderEntries(selectedDeduction.itEntries, "IT Entries", true)}
                  {renderEntries(selectedDeduction.kamgaarEntries, "Kamgaar Entries")}
                  {renderEntries(selectedDeduction.insuranceEntries, "Insurance Entries")}

                  {/* Document Links */}
                  <div className="mt-4">
                    {selectedDeduction?.document?.url && (
                      <div>
                        <p className="font-medium text-[#02557a]">User Uploaded Document:</p>
                        <a
                          href={selectedDeduction?.document?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Document
                        </a>
                      </div>
                    )}
                    {selectedDeduction?.uploadDocumentbyAdmin?.url && (
                      <div>
                        <p className="font-medium text-[#02557a]">Admin Uploaded Document:</p>
                        <a
                          href={selectedDeduction?.uploadDocumentbyAdmin?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Document
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Admin Actions */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-[#02557a] mb-2">Admin Actions</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Seen by Admin</label>
                        <input
                          type="checkbox"
                          checked={seenByAdminForm}
                          onChange={(e) => setSeenByAdminForm(e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Document</label>
                        <input
                          type="file"
                          accept="application/pdf, image/*"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          onChange={(e) => setDocumentFile(e.target.files[0])}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </DialogBody>
            <DialogFooter className="flex justify-end space-x-2">
              <Button
                variant="text"
                color="red"
                onClick={handleCloseModal}
                className="mr-2"
              >
                Close
              </Button>
              <Button
                variant="filled"
                color="blue"
                onClick={handleSubmit}
                disabled={updateLoading}
                className="bg-[#02557a] text-white"
              >
                {updateLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </Dialog>

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
                  className={`px-3 py-1 rounded-md ${pagination.hasPrevPage
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
                  className={`px-3 py-1 rounded-md ${pagination.hasNextPage
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