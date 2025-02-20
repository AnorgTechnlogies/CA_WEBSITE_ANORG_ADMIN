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
import { exportDeductionsData } from "../../store/slices/exportDeductionsDataSlice"; // Import the new action
import { useNavigate } from "react-router-dom";

export function ExportAllData() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get states from Redux
  const { grampanchayats, totalCount: gpTotal, loading: gpLoading, error: gpError } = useSelector(
    (state) => state.getAllData
  );
  const { staff, totalCount: staffTotal, loading: staffLoading, error: staffError } = useSelector(
    (state) => state.staff
  );
  const { loading: exportLoading, error: exportError, message: exportMessage } = useSelector(
    (state) => state.deductions
  );

  useEffect(() => {
    dispatch(fetchAllGrampanchayats());
    dispatch(fetchAllStaff());
  }, [dispatch]);

  useEffect(() => {
    if (gpError) toast.error(gpError);
    if (staffError) toast.error(staffError);
    if (exportError) toast.error(exportError);
    if (exportMessage) toast.success(exportMessage);
  }, [gpError, staffError, exportError, exportMessage]);

  const stats = {
    tehsilStaff: staffTotal || 0,
    gramPanchayats: gpTotal || 0
  };

  // Handler functions for the buttons
  const handleExportDeductions = async (gpId) => {
    try {
      await dispatch(exportDeductionsData(gpId));
    } catch (error) {
      toast.error("Failed to export deductions");
    }
  };

  const handleViewAgreementData = (gpId) => {
    navigate(`/dashboard/viewAgreementRecord/${gpId}`);
  };

  const handleViewMRData = (gpId) => {
    navigate(`/mr-data/${gpId}`);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="w-full px-6">
            {/* Gram Panchayat List Section */}
            {grampanchayats.length > 0 && (
              <div className="mt-8">
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Total Gram Panchayat Registrations
                </Typography>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                          Gram Panchayat Name
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                            GST No
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                            Mobile
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                            Location
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                            Actions
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {grampanchayats.map((gp) => (
                        <tr key={gp._id}>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray">
                              {gp.name}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray">
                              {gp.gstNo}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray">
                              {gp.gpMobileNumber}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray">
                              {`${gp.village}, ${gp.tahsil}, ${gp.district}`}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button
                                color="blue"
                                size="sm"
                                onClick={() => handleExportDeductions(gp._id)}
                                disabled={exportLoading}
                              >
                                {exportLoading ? "Exporting..." : "Export DD Data"}
                              </Button>
                              <Button
                                color="green"
                                size="sm"
                                onClick={() => handleViewAgreementData(gp._id)}
                              >
                                Export Agreement Data
                              </Button>
                              <Button
                                color="purple"
                                size="sm"
                                onClick={() => handleViewMRData(gp._id)}
                              >
                                Export MR Data
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

export default ExportAllData;