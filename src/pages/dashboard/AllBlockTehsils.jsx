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

export function AllBlockTehsils() {
  const dispatch = useDispatch();
  const { grampanchayats, totalCount: gpTotal, loading: gpLoading, error: gpError } = useSelector(
    (state) => state.getAllData
  );
  const { staff, totalCount: staffTotal, loading: staffLoading, error: staffError } = useSelector(
    (state) => state.staff // Changed from state.getStaff to state.staff
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

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="w-full px-6">

            {/* Staff List Section */}
            {staff.length > 0 && (
              <div className="mt-8">
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Recent Tehsil Block Registrations
                </Typography>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                          Tehsil Block Name
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                            Email
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                            Mobile
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                            Assigned Panchayats
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {staff.map((member) => (
                        <tr key={member._id}>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray">
                              {`${member.staffName}, ${member.staffDist}, ${member.staffState} `}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray">
                              {member.staffEmail}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray">
                              {member.staffMobileNo}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray">
                              {member.grampanchayats?.length || 0}
                            </Typography>
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

export default AllBlockTehsils;