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
      <Card className="shadow-md">
        <CardHeader variant="gradient" className="p-6" style={{ background: "#02557a" }}>
          <Typography variant="h6" color="white">
            Tehsil Block Management
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="w-full px-6">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 mt-6">
              <Card className="bg-white shadow-sm">
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full" style={{ backgroundColor: "rgba(2, 85, 122, 0.1)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                          className="w-6 h-6" style={{ color: "#02557a" }}>
                        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                      </svg>
                    </div>
                    <div>
                      <Typography variant="h6" style={{ color: "#02557a" }}>
                        Total Staff
                      </Typography>
                      <Typography variant="h4" color="black">
                        {staffLoading ? "Loading..." : stats.tehsilStaff}
                      </Typography>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="bg-white shadow-sm">
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full" style={{ backgroundColor: "rgba(89, 185, 79, 0.1)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                          className="w-6 h-6" style={{ color: "#59b94f" }}>
                        <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                        <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <Typography variant="h6" style={{ color: "#59b94f" }}>
                        Assigned Panchayats
                      </Typography>
                      <Typography variant="h4" color="black">
                        {gpLoading ? "Loading..." : stats.gramPanchayats}
                      </Typography>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Staff List Section */}
            {staff.length > 0 && (
              <div className="mb-8">
                <Typography variant="h6" style={{ color: "#ee792d" }} className="mb-4">
                  Tehsil Block Registrations
                </Typography>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        <th className="border-b p-4" style={{ backgroundColor: "rgba(2, 85, 122, 0.1)" }}>
                          <Typography variant="small" color="black" className="font-medium leading-none">
                            Tehsil Block Name
                          </Typography>
                        </th>

                        <th className="border-b p-4" style={{ backgroundColor: "rgba(2, 85, 122, 0.1)" }}>
                          <Typography variant="small" color="black" className="font-medium leading-none">
                            Asign Staff Name
                          </Typography>
                        </th>
                        <th className="border-b p-4" style={{ backgroundColor: "rgba(2, 85, 122, 0.1)" }}>
                          <Typography variant="small" color="black" className="font-medium leading-none">
                            Email
                          </Typography>
                        </th>
                        <th className="border-b p-4" style={{ backgroundColor: "rgba(2, 85, 122, 0.1)" }}>
                          <Typography variant="small" color="black" className="font-medium leading-none">
                            Mobile
                          </Typography>
                        </th>
                        <th className="border-b p-4" style={{ backgroundColor: "rgba(2, 85, 122, 0.1)" }}>
                          <Typography variant="small" color="black" className="font-medium leading-none">
                            Assigned Panchayats
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {staff.map((member, index) => (
                        <tr key={member._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="p-4">
                            <Typography variant="small" className="font-medium" style={{ color: "#02557a" }}>
                              {member.staffTahsil}
                            </Typography>
                            <Typography variant="small" color="gray" className="text-xs">
                              {`${member.staffDist}, ${member.staffState}`}
                            </Typography>
                          </td>

                          <td className="p-4">
                            <Typography variant="small" color="black">
                              {member.staffName}
                            </Typography>
                          </td>

                          <td className="p-4">
                            <Typography variant="small" color="black">
                              {member.staffEmail}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="black">
                              {member.staffMobileNo}
                            </Typography>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center items-center">
                              <span className="px-2 py-1 rounded-full text-xs font-medium" 
                                    style={{ backgroundColor: "rgba(89, 185, 79, 0.1)", color: "#59b94f" }}>
                                {member.grampanchayats?.length || 0}
                              </span>
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

export default AllBlockTehsils;