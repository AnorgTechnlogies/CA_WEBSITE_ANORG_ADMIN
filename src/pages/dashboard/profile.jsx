import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from "@heroicons/react/24/solid";
import { useSelector } from 'react-redux';
import AdminImg from "../../../public/img/dummy-image.jpg"

export function Profile(){
  const { doctor } = useSelector((state) => state.doctor);
  console.log("doctor : ", doctor);
  
  return (
    <div className="relative mt-8 h-full w-full">
      {/* Background gradient */}
      <div className="absolute inset-0 h-80" />
      
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="relative -mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="col-span-1 shadow-lg">
            <CardHeader className="h-52" style={{ background: "linear-gradient(to bottom, #02557a, rgba(2, 85, 122, 0.7))" }}>
              <div className="flex flex-col items-center justify-center h-full">
                <Avatar
                  size="xxl"
                  src={doctor?.adminImagelink?.url || AdminImg}
                  alt="profile-picture"
                  className="ring-4 ring-white h-32 w-32 shadow-xl"
                />
              </div>
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h4" style={{ color: "#02557a" }} className="mb-2">
                {doctor?.adminName || "Admin Name"}
              </Typography>
              <Typography variant="h6" className="font-medium" style={{ color: "#ee792d" }}>
                Admin
              </Typography>
              <Typography className="font-medium" style={{ color: "#59b94f" }}>
                PITAX PRIVATE LIMITED
              </Typography>
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 justify-center" style={{ color: "#02557a" }}>
                  <EnvelopeIcon className="h-5 w-5" />
                  <Typography>{doctor?.adminEmailId}</Typography>
                </div>
                <div className="flex items-center gap-3 justify-center" style={{ color: "#02557a" }}>
                  <PhoneIcon className="h-5 w-5" />
                  <Typography>{doctor?.adminMobileNo || "Not provided"}</Typography>
                </div>
                <div className="flex items-center gap-3 justify-center" style={{ color: "#02557a" }}>
                  <MapPinIcon className="h-5 w-5" />
                  <Typography>{doctor?.adminLocation || "Location not set"}</Typography>
                </div>
              </div>
            </CardBody>

          </Card>

          {/* Main Content Area */}
          <Card className="col-span-2 shadow-lg">
            <CardBody>
              <div className="grid gap-6">
                <div>
                  <Typography variant="h6" className="mb-4" style={{ color: "#02557a" }}>
                    Account Information
                  </Typography>
                  <div className="grid gap-4">
                    <div className="p-4 bg-white rounded-lg shadow-sm" style={{ border: "1px solid rgba(2, 85, 122, 0.2)" }}>
                      <Typography variant="small" className="font-semibold" style={{ color: "#ee792d" }}>
                        Email
                      </Typography>
                      <Typography className="text-black">
                        {doctor?.adminEmailId}
                      </Typography>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm" style={{ border: "1px solid rgba(2, 85, 122, 0.2)" }}>
                      <Typography variant="small" className="font-semibold" style={{ color: "#ee792d" }}>
                        Mobile Number
                      </Typography>
                      <Typography className="text-black">
                        {doctor?.adminMobileNo || "Not provided"}
                      </Typography>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm" style={{ border: "1px solid rgba(2, 85, 122, 0.2)" }}>
                      <Typography variant="small" className="font-semibold" style={{ color: "#ee792d" }}>
                        Location
                      </Typography>
                      <Typography className="text-black">
                        {doctor?.adminLocation || "Not provided"}
                      </Typography>
                    </div>
                  </div>
                  
                  {/* Additional Section - System Information */}
                  <div className="mt-6">
                    <Typography variant="h6" className="mb-4" style={{ color: "#59b94f" }}>
                      System Information
                    </Typography>
                    <div className="grid gap-4">
                      <div className="p-4 bg-white rounded-lg shadow-sm" style={{ border: "1px solid rgba(89, 185, 79, 0.2)" }}>
                        <Typography variant="small" className="font-semibold" style={{ color: "#02557a" }}>
                          Last Login
                        </Typography>
                        <Typography className="text-black">
                          {new Date().toLocaleString()}
                        </Typography>
                      </div>
                      <div className="p-4 bg-white rounded-lg shadow-sm" style={{ border: "1px solid rgba(89, 185, 79, 0.2)" }}>
                        <Typography variant="small" className="font-semibold" style={{ color: "#02557a" }}>
                          Account Status
                        </Typography>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <Typography className="text-black">Active</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;