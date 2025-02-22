import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import { fetchAllGrampanchayats } from "../../store/slices/getDisplayAllData";
import { fetchAllStaff } from "../../store/slices/getStaffSlice";
import { useNavigate } from "react-router-dom";

// Custom styles for the buttons based on the provided colors
const buttonStyles = {
  viewDD: {
    backgroundColor: "#02557a",
    color: "white",
  },
  viewAgreement: {
    backgroundColor: "#ee792d",
    color: "white",
  },
  viewMR: {
    backgroundColor: "#59b94f",
    color: "white",
  }
};

export function AllGrampanchayat() {
  const dispatch = useDispatch();
  const { grampanchayats, totalCount: gpTotal, loading: gpLoading, error: gpError } = useSelector(
    (state) => state.getAllData
  );
  const { staff, totalCount: staffTotal, loading: staffLoading, error: staffError } = useSelector(
    (state) => state.staff
  );

  useEffect(() => {
    dispatch(fetchAllGrampanchayats());
    dispatch(fetchAllStaff());
  }, [dispatch]);

  useEffect(() => {
    if (gpError) toast.error(gpError);
    if (staffError) toast.error(staffError);
  }, [gpError, staffError]);

  const stats = {
    tehsilStaff: staffTotal || 0,
    gramPanchayats: gpTotal || 0
  };

  const navigate = useNavigate();

  // Handler functions for the buttons
  const handleViewDDData = (gpId) => {
    navigate(`/dashboard/viewDeductionData/${gpId}`);
  };

  const handleViewAgreementData = (gpId) => {
    navigate(`/dashboard/viewAgreementRecord/${gpId}`);
  };

  const handleViewMRData = (gpId) => {
    navigate(`/mr-data/${gpId}`);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="border border-gray-200 shadow-md">
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="w-full px-6">

            {/* Gram Panchayat List Section */}
            {grampanchayats.length > 0 && (
              <div className="mt-8">
                <Typography 
                  variant="h6" 
                  className="mb-4 text-lg font-semibold" 
                  style={{ color: "#02557a" }}
                >
                  Total Gram Panchayat Registrations
                </Typography>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        <th className="border-b p-4" style={{ backgroundColor: "#f8f9fa" }}>
                          <Typography 
                            variant="small" 
                            className="font-medium" 
                            style={{ color: "#02557a" }}
                          >
                            Gram Panchayat Name
                          </Typography>
                        </th>
                        <th className="border-b p-4" style={{ backgroundColor: "#f8f9fa" }}>
                          <Typography 
                            variant="small" 
                            className="font-medium" 
                            style={{ color: "#02557a" }}
                          >
                            GST No
                          </Typography>
                        </th>
                        <th className="border-b p-4" style={{ backgroundColor: "#f8f9fa" }}>
                          <Typography 
                            variant="small" 
                            className="font-medium" 
                            style={{ color: "#02557a" }}
                          >
                            Mobile
                          </Typography>
                        </th>
                        <th className="border-b p-4" style={{ backgroundColor: "#f8f9fa" }}>
                          <Typography 
                            variant="small" 
                            className="font-medium" 
                            style={{ color: "#02557a" }}
                          >
                            Location
                          </Typography>
                        </th>
                        <th className="border-b p-4" style={{ backgroundColor: "#f8f9fa" }}>
                          <Typography 
                            variant="small" 
                            className="font-medium" 
                            style={{ color: "#02557a" }}
                          >
                            Actions
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {grampanchayats.map((gp) => (
                        <tr key={gp._id} className="hover:bg-gray-50">
                          <td className="p-4 border-b border-gray-100">
                            <Typography variant="small" className="text-gray-800 font-medium">
                              {gp.grampanchayat}
                            </Typography>
                          </td>
                          <td className="p-4 border-b border-gray-100">
                            <Typography variant="small" className="text-gray-700">
                              {gp.gstNo}
                            </Typography>
                          </td>
                          <td className="p-4 border-b border-gray-100">
                            <Typography variant="small" className="text-gray-700">
                              {gp.gpMobileNumber}
                            </Typography>
                          </td>
                          <td className="p-4 border-b border-gray-100">
                            <Typography variant="small" className="text-gray-700">
                              {`${gp.grampanchayat}, ${gp.tahsil}, ${gp.district}`}
                            </Typography>
                          </td>
                          <td className="p-4 border-b border-gray-100">
                            <div className="flex flex-wrap gap-2">
                              <Button
                                size="sm"
                                className="shadow-sm transition-all duration-200 hover:shadow-md"
                                style={buttonStyles.viewDD}
                                onClick={() => handleViewDDData(gp._id)}
                              >
                                View DD Data
                              </Button>
                              <Button
                                size="sm"
                                className="shadow-sm transition-all duration-200 hover:shadow-md"
                                style={buttonStyles.viewAgreement}
                                onClick={() => handleViewAgreementData(gp._id)}
                              >
                                View Agreement Data
                              </Button>
                              <Button
                                size="sm"
                                className="shadow-sm transition-all duration-200 hover:shadow-md"
                                style={buttonStyles.viewMR}
                                onClick={() => handleViewMRData(gp._id)}
                              >
                                View MR Data
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default AllGrampanchayat;