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
      <div className="absolute inset-0 bg-gradient-to-r  h-80" />
      
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="relative -mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="col-span-1 shadow-lg">
            <CardHeader className="h-52 bg-gradient-to-t from-gray-900 to-gray-700">
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
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {doctor?.adminName || "Admin Name"}
              </Typography>
              <Typography color="blue-gray" variant="h6" className="font-medium" textGradient>
                Admin
              </Typography>
              <Typography color="blue-gray" className="font-medium" textGradient>
                PITAX PRIVATE LIMITED
              </Typography>
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 justify-center text-blue-gray-600">
                  <EnvelopeIcon className="h-5 w-5" />
                  <Typography>{doctor?.adminEmailId}</Typography>
                </div>
                <div className="flex items-center gap-3 justify-center text-blue-gray-600">
                  <PhoneIcon className="h-5 w-5" />
                  <Typography>{doctor?.adminMobileNo || "Not provided"}</Typography>
                </div>
                <div className="flex items-center gap-3 justify-center text-blue-gray-600">
                  <MapPinIcon className="h-5 w-5" />
                  <Typography>{doctor?.adminLocation || "Location not set"}</Typography>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-center gap-2 pt-2">
              <Button
                size="lg"
                variant="outlined"
                color="blue-gray"
                className="flex items-center gap-3"
              >
                <PencilIcon className="h-4 w-4" /> Edit Profile
              </Button>
            </CardFooter>
          </Card>

          {/* Main Content Area */}
          <Card className="col-span-2 shadow-lg">
            <CardBody>
              <div className="grid gap-6">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-4">
                    Account Information
                  </Typography>
                  <div className="grid gap-4">
                    <div className="p-4 bg-white rounded-lg shadow-sm border border-blue-gray-50">
                      <Typography variant="small" className="font-semibold text-blue-gray-600">
                        Email
                      </Typography>
                      <Typography>{doctor?.adminEmailId}</Typography>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm border border-blue-gray-50">
                      <Typography variant="small" className="font-semibold text-blue-gray-600">
                        Mobile Number
                      </Typography>
                      <Typography>{doctor?.adminMobileNo || "Not provided"}</Typography>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm border border-blue-gray-50">
                      <Typography variant="small" className="font-semibold text-blue-gray-600">
                        Location
                      </Typography>
                      <Typography>{doctor?.adminLocation || "Not provided"}</Typography>
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