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

export function Home() {
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

  const navigate = useNavigate();

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" className="mb-8 p-6" style={{ background: "#02557a" }}>
          <Typography variant="h6" color="white">
            Admin Dashboard Overview
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="w-full px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Staff Stats Card */}
              <Card className="bg-white shadow-lg">
                <CardBody>
                  <div className="flex items-center justify-between mb-4">
                    <Typography variant="h6" style={{ color: "#02557a" }}>
                      Tehsil/Staff Members
                    </Typography>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(2, 85, 122, 0.1)" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                        style={{ color: "#02557a" }}
                      >
                        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                      </svg>
                    </div>
                  </div>
                  <Typography variant="h3" color="black" className="mb-2">
                    {staffLoading ? "Loading..." : stats.tehsilStaff}
                  </Typography>
                  <Typography variant="paragraph" color="gray" className="mb-4">
                    Total registered staff members
                  </Typography>
                  <Button
                    variant="filled"
                    fullWidth
                    className="text-white"
                    style={{ backgroundColor: "#02557a" }}
                    onClick={() => navigate("/dashboard/allTehsil")}
                  >
                    View Staff Details
                  </Button>
                </CardBody>
              </Card>

              {/* Gram Panchayat Stats Card */}
              <Card className="bg-white shadow-lg">
                <CardBody>
                  <div className="flex items-center justify-between mb-4">
                    <Typography variant="h6" style={{ color: "#59b94f" }}>
                      Gram Panchayat Registrations
                    </Typography>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(89, 185, 79, 0.1)" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                        style={{ color: "#59b94f" }}
                      >
                        <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                        <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <Typography variant="h3" color="black" className="mb-2">
                    {gpLoading ? "Loading..." : stats.gramPanchayats}
                  </Typography>
                  <Typography variant="paragraph" color="gray" className="mb-4">
                    Total registered Gram Panchayats
                  </Typography>
                  <Button
                    variant="filled"
                    fullWidth
                    className="text-white"
                    style={{ backgroundColor: "#59b94f" }}
                    onClick={() => navigate("/dashboard/allGrampanchayat")}
                  >
                    View Panchayat Details
                  </Button>
                </CardBody>
              </Card>
            </div>

            {/* Staff List Section */}
            {staff.length > 0 && (
              <div className="mt-8">
                <Typography variant="h6" style={{ color: "#02557a" }} className="mb-4">
                  Recent Tahsil Registrations
                </Typography>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        <th className="border-b p-4" style={{ backgroundColor: "rgba(2, 85, 122, 0.1)" }}>
                          <Typography variant="small" color="black" className="font-normal leading-none opacity-70">
                            Name
                          </Typography>
                        </th>
                        <th className="border-b p-4" style={{ backgroundColor: "rgba(2, 85, 122, 0.1)" }}>
                          <Typography variant="small" color="black" className="font-normal leading-none opacity-70">
                            Email
                          </Typography>
                        </th>
                        <th className="border-b p-4" style={{ backgroundColor: "rgba(2, 85, 122, 0.1)" }}>
                          <Typography variant="small" color="black" className="font-normal leading-none opacity-70">
                            Mobile
                          </Typography>
                        </th>
                        <th className="border-b p-4" style={{ backgroundColor: "rgba(2, 85, 122, 0.1)" }}>
                          <Typography variant="small" color="black" className="font-normal leading-none opacity-70">
                            Assigned Panchayats
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {staff.map((member, index) => (
                        <tr key={member._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
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
                          <td className="p-4">
                            <Typography 
                              variant="small" 
                              className="font-medium" 
                              style={{ color: "#02557a" }}
                            >
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

            {/* Gram Panchayat List Section */}
            {grampanchayats.length > 0 && (
              <div className="mt-8">
                <Typography variant="h6" style={{ color: "#ee792d" }} className="mb-4">
                  Recent Gram Panchayat Registrations
                </Typography>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        <th className="border-b p-4" style={{ backgroundColor: "rgba(238, 121, 45, 0.1)" }}>
                          <Typography variant="small" color="black" className="font-normal leading-none opacity-70">
                            Name
                          </Typography>
                        </th>
                        <th className="border-b p-4" style={{ backgroundColor: "rgba(238, 121, 45, 0.1)" }}>
                          <Typography variant="small" color="black" className="font-normal leading-none opacity-70">
                            GST No
                          </Typography>
                        </th>
                        <th className="border-b p-4" style={{ backgroundColor: "rgba(238, 121, 45, 0.1)" }}>
                          <Typography variant="small" color="black" className="font-normal leading-none opacity-70">
                            Mobile
                          </Typography>
                        </th>
                        <th className="border-b p-4" style={{ backgroundColor: "rgba(238, 121, 45, 0.1)" }}>
                          <Typography variant="small" color="black" className="font-normal leading-none opacity-70">
                            Location
                          </Typography>
                        </th>
                        <th className="border-b p-4" style={{ backgroundColor: "rgba(238, 121, 45, 0.1)" }}>
                          <Typography variant="small" color="black" className="font-normal leading-none opacity-70">
                            Asign Gram Adhikari
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {grampanchayats.map((gp, index) => (
                        <tr key={gp._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="p-4">
                            <Typography variant="small" color="black">
                              {gp.grampanchayat}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="black">
                              {gp.gstNo}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="black">
                              {gp.gpMobileNumber}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="black">
                              {`${gp.grampanchayat}, ${gp.tahsil}, ${gp.district}, ${gp.state}`}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography 
                              variant="small" 
                              className="font-medium"
                              style={{ color: "#ee792d" }}
                            >
                              {`${gp.gramAdhikariName}`}
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

export default Home;