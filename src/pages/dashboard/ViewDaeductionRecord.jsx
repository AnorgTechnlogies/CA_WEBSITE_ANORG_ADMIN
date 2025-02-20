// Add these imports at the top
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Select,
  Option,
  Switch,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createGSTEntry,
  createInsuranceEntry,
  createKamgarEntry,
  clearErrors,
  clearMessage,
  createITEntry,
  createRoyaltyEntry,
  getGSTEntries,
  getInsuranceEntries,
  getKamgarEntries,
  getITEntries,
  getRoyaltyEntries,
  updateGSTEntry,
  updateInsuranceEntry,
  updateKamgarEntry,
  updateITEntry,
  updateRoyaltyEntry
} from "../../store/slices/challanSlice";
import { useParams } from "react-router-dom";
import { getGrampanchayatById } from "@/store/slices/grampanchayatSlice";
import FileUploadComponent from "./Components/FileUploadByAdmin";
import { updateGSTDocument, updateInsuranceDocument, updateITDocument, updateKaamgarDocument, updateRoyaltyDocument } from "@/store/slices/AdminUploadDDFile";

export function ViewDeductionRecord() {
  const { 
    loading, 
    error, 
    message, 
    gstEntries,
    insuranceEntries,
    kamgarEntries,
    itEntries,
    royaltyEntries 
  } = useSelector((state) => state.challan);
  
  const [formType, setFormType] = useState("");
  const { gpId } = useParams();
  const dispatch = useDispatch();

  const { loading: grampanchayatLoading, singleGrampanchayat, error: grampanchayatError } = useSelector(
    (state) => state.grampanchayat
  );

  useEffect(() => {
    if (gpId) {
      dispatch(getGrampanchayatById(gpId));
    }
  }, [dispatch, gpId]);

  // Form States
  const [gstData, setGstData] = useState({
    date: "",
    gstPartyName: "",
    gstNo: "",
    amount: "",
    checkNo: "",
    pfmsDate: "",
  });

  const [insuranceData, setInsuranceData] = useState({
    date: "",
    amount: "",
    insuranceNo: ""
  });

  const [kamgarData, setKamgarData] = useState({
    date: "",
    amount: "",
  });

  const [iTData, setITData] = useState({
    date: "",
    partyName: "",
    pan: "",
    amount: "",
  });

  const [royaltyData, setRoyaltyData] = useState({
    date: "",
    amount: "",
  });

  const handleStatusToggle = (entryId, currentStatus, entryType) => {
    const updateData = { seenByAdmin: !currentStatus };
    
    switch (entryType) {
      case "gst":
        dispatch(updateGSTEntry(entryId, updateData));
        break;
      case "insurance":
        dispatch(updateInsuranceEntry(entryId, updateData));
        break;
      case "kamgar":
        dispatch(updateKamgarEntry(entryId, updateData));
        break;
      case "iT":
        dispatch(updateITEntry(entryId, updateData));
        break;
      case "royalty":
        dispatch(updateRoyaltyEntry(entryId, updateData));
        break;
      default:
        break;
    }
  };

  // Effect Handlers
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      handleReset();
    }
  }, [error, message, dispatch]);

  // Event Handlers
  const handleFormTypeChange = (value) => setFormType(value);

  const handleGstChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGstData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleInsuranceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInsuranceData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleKamgarChange = (e) => {
    const { name, value, type, checked } = e.target;
    setKamgarData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleITChange = (e) => {
    const { name, value, type, checked } = e.target;
    setITData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRoyaltyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoyaltyData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = (data) => {
    const requiredFields = Object.keys(data).filter(key => 
      key !== 'fileUploaded' && 
      key !== 'challanReceived' && 
      key !== 'checkNo' && 
      key !== 'pfmsDate'
    );

    for (let field of requiredFields) {
      if (!data[field]) {
        toast.error(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData;
    let action;

    switch (formType) {
      case "gst":
        formData = gstData;
        action = createGSTEntry;
        break;
      case "insurance":
        formData = insuranceData;
        action = createInsuranceEntry;
        break;
      case "kamgar":
        formData = kamgarData;
        action = createKamgarEntry;
        break;
      case "iT":
        formData = { ...iTData, grampanchayats: [gpId] };
        action = createITEntry;
        break;
      case "royalty":
        formData = { ...royaltyData, grampanchayats: [gpId] };
        action = createRoyaltyEntry;
        break;
      default:
        toast.error("Please select a form type");
        return;
    }

    if (!validateForm(formData)) return;
    dispatch(action(formData, gpId));
  };

  const handleReset = () => {
    setGstData({
      date: "",
      gstNo: "",
      amount: "",
      checkNo: "",
      pfmsDate: "",
      gstPartyName: "",
      grampanchayatName: "",
    });

    setInsuranceData({
      date: "",
      amount: "",
      insuranceNo: ""
    });

    setKamgarData({
      date: "",
      amount: "",
    });

    setITData({
      date: "",
      partyName: "",
      pan: "",
      amount: "",
    });
    setRoyaltyData({
      date: "",
      amount: "",
    });
  };

  useEffect(() => {
    if (formType && gpId) {
      switch (formType) {
        case "gst":
          dispatch(getGSTEntries(gpId));
          break;
        case "insurance":
          dispatch(getInsuranceEntries(gpId));
          break;
        case "kamgar":
          dispatch(getKamgarEntries(gpId));
          break;
        case "iT":
          dispatch(getITEntries(gpId));
          break;
        case "royalty":
          dispatch(getRoyaltyEntries(gpId));
          break;
        default:
          break;
      }
    }
  }, [formType, gpId, dispatch]);

    // Function to render the appropriate data table based on form type
    const renderDataTable = () => {
      let entries = [];
      let columns = [];
      let uploadHandler = null;
    
      switch (formType) {
        case "gst":
          entries = gstEntries;
          columns = ["Date", "Party Name", "GST No", "Amount", "Check No", "PFMS Date", "Status", "Upload Receipt"];
          uploadHandler = updateGSTDocument;
          break;
        case "insurance":
          entries = insuranceEntries;
          columns = ["Date", "Insurance No", "Amount", "Status", "Upload Receipt"];
          uploadHandler = updateInsuranceDocument;
          break;
        case "kamgar":
          entries = kamgarEntries;
          columns = ["Date", "Amount", "Status", "Upload Receipt"];
          uploadHandler = updateKaamgarDocument;
          break;
        case "iT":
          entries = itEntries;
          columns = ["Date", "Party Name", "PAN", "Amount", "Status", "Upload Receipt"];
          uploadHandler = updateITDocument;
          break;
        case "royalty":
          entries = royaltyEntries;
          columns = ["Date", "Amount", "Status", "Upload Receipt"];
          uploadHandler = updateRoyaltyDocument;
          break;
        default:
          return null;
      }
    
      return (
        <div className="mt-8 overflow-x-auto">
          <Typography variant="h6" color="blue-gray" className="mb-4">
            {formType.toUpperCase()} Entries
          </Typography>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {columns.map((header) => (
                  <th key={header} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td className="p-4">{new Date(entry.date).toLocaleDateString()}</td>
                  {formType === "gst" && (
                    <>
                      <td className="p-4">{entry.gstPartyName}</td>
                      <td className="p-4">{entry.gstNo}</td>
                      <td className="p-4">₹{entry.amount}</td>
                      <td className="p-4">{entry.checkNo || "-"}</td>
                      <td className="p-4">{entry.pfmsDate ? new Date(entry.pfmsDate).toLocaleDateString() : "-"}</td>
                    </>
                  )}
                  {formType === "insurance" && (
                    <>
                      <td className="p-4">{entry.insuranceNo}</td>
                      <td className="p-4">₹{entry.amount}</td>
                    </>
                  )}
                  {formType === "kamgar" && (
                    <td className="p-4">₹{entry.amount}</td>
                  )}
                  {formType === "iT" && (
                    <>
                      <td className="p-4">{entry.partyName}</td>
                      <td className="p-4">{entry.pan}</td>
                      <td className="p-4">₹{entry.amount}</td>
                    </>
                  )}
                  {formType === "royalty" && (
                    <td className="p-4">₹{entry.amount}</td>
                  )}
                  <td className="p-4">
                    <Switch
                      checked={entry.seenByAdmin}
                      onChange={() => handleStatusToggle(entry._id, entry.seenByAdmin, formType)}
                      label={entry.seenByAdmin ? "Seen" : "Unseen"}
                    />
                  </td>
                  <td className="p-4">
                    <FileUploadComponent
                      onUpload={(id, formData) => dispatch(uploadHandler(id, formData))}
                      fileId={entry._id}
                      type={formType}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

  return (
    <div className="max-w-7xl  px-4 sm:px-6 lg:px-8 py-8">
      <Card className="shadow-xl rounded-xl">
        <CardHeader 
          variant="gradient" 
          color="blue-gray" 
          className="p-6 m-0"
        >
          <Typography variant="h5" color="white" className="font-medium">
            Deduction Data Entry Form
          </Typography>
        </CardHeader>

        {loading && (
          <div className="flex justify-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6">
            <p className="text-red-700">Error: {error}</p>
          </div>
        )}

{singleGrampanchayat && (
  <div className="bg-white shadow-md rounded-lg p-6 m-6 border border-gray-200">
    <h1>Add Deduction Type for Grampanchayat</h1>
    <h2 className="text-2xl font-semibold text-gray-800 mb-3">
      {singleGrampanchayat.data.grampanchayat}
    </h2>
    <p className="text-gray-600 text-lg">
      <span className="font-medium text-gray-700">Location:</span> {`${singleGrampanchayat.data.grampanchayat}, ${singleGrampanchayat.data.tahsil}, ${singleGrampanchayat.data.district}`}
    </p>
    <p className="text-gray-600 text-lg">
      <span className="font-medium text-gray-700">State:</span> {singleGrampanchayat.data.state}
    </p>
    <p className="text-gray-600 text-lg">
      <span className="font-medium text-gray-700">Contact:</span> {singleGrampanchayat.data.gpMobileNumber}
    </p>
  </div>
)}

        <CardBody className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="mb-8">
              <Select 
                label="Select Deduction Type" 
                value={formType} 
                onChange={handleFormTypeChange}
                className="border-gray-300 focus:ring-blue-500"
              >
                <Option value="gst">GST</Option>
                <Option value="insurance">Insurance</Option>
                <Option value="kamgar">Kamgar</Option>
                <Option value="iT">IT</Option>
                <Option value="royalty">Royalty</Option>
              </Select>
            </div>
          </form>

          {/* Add the data table */}
          {formType && renderDataTable()}
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
      />
    </div>
  );
}

export default ViewDeductionRecord;