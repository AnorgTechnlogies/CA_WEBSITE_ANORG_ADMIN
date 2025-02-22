import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import pitaxLogo from "../../../public/img/logo.jpg"
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { registerDoctor } from '../../store/slices/doctorSlice';

export function SignUp() {
  const [formData, setFormData] = useState({
    doctorName: '',
    doctorEmailId: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    profileImage: null
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isRegistered } = useSelector((state) => state.doctor);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isRegistered) {
      toast.success('Registration successful!');
      navigate('/dashboard');
    }
  }, [error, isRegistered, navigate]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'profileImage' ? files[0] : value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.doctorName || !formData.doctorEmailId || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.termsAccepted) {
      toast.error('Please accept the Terms and Conditions');
      return;
    }

    const registrationData = new FormData();
    registrationData.append('adminName', formData.doctorName);
    registrationData.append('adminEmailId', formData.doctorEmailId);
    registrationData.append('adminPassword', formData.password);
    registrationData.append('adminLocation', "LocationData");
    registrationData.append('adminMobileNo', "9171976922");
    if (formData.profileImage) {
      registrationData.append('adminImagelink', formData.profileImage);
    }

    dispatch(registerDoctor(registrationData));
  };

  return (
    <div className="min-h-screen bg-white flex p-2">
      <ToastContainer 
        position="top-right" 
        autoClose={4000} 
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
      />

      {/* Left side - Gradient Background */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ee792d] via-[#02557a] to-[#59b94f] rounded-l-3xl ">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            {/* Your logo here - adjust width/height as needed */}
            <img
              src={pitaxLogo} 
              alt="PITAX Logo"
              className="max-w-xs w-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Right side - Sign-Up Form */}
      <div className="flex-1 flex flex-col justify-center py-4 sm:px-1 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-lg">
          {/* Logo for mobile view */}
          <div className="flex justify-center mb-8 lg:hidden">
            <img
              src={pitaxLogo}
              alt="PITAX Logo"
              className="h-16 object-contain"
            />
          </div>
          
          <div className="text-center mb-6">
            <Typography variant="h1" className="text-4xl font-bold text-gray-900 mb-1">
              Welcome to PITAX
            </Typography>
            <Typography variant="h4" className="text-xl text-gray-600 font-normal">
              Register as an Admin
            </Typography>
          </div>

          <Card className="p-8 shadow-lg rounded-2xl bg-white">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Typography variant="small" className="text-gray-700 font-semibold">
                  Admin Name
                </Typography>
                <Input
                  name="doctorName"
                  size="lg"
                  placeholder="Enter your name"
                  value={formData.doctorName}
                  onChange={handleChange}
                  className="!border-gray-300 focus:!border-[#02557a]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className="space-y-2">
                <Typography variant="small" className="text-gray-700 font-semibold">
                  Email Address
                </Typography>
                <Input
                  name="doctorEmailId"
                  size="lg"
                  placeholder="Enter your Email"
                  value={formData.doctorEmailId}
                  onChange={handleChange}
                  className="!border-gray-300 focus:!border-[#02557a]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className="space-y-2">
                <Typography variant="small" className="text-gray-700 font-semibold">
                  Password
                </Typography>
                <Input
                  name="password"
                  type="password"
                  size="lg"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="!border-gray-300 focus:!border-[#02557a]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className="space-y-2">
                <Typography variant="small" className="text-gray-700 font-semibold">
                  Confirm Password
                </Typography>
                <Input
                  name="confirmPassword"
                  type="password"
                  size="lg"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="!border-gray-300 focus:!border-[#02557a]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <Checkbox
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  color="blue"
                  className="checked:bg-[#02557a] checked:border-[#02557a]"
                  label={
                    <Typography variant="small" className="font-medium text-gray-700">
                      I agree to the{" "}
                      <a href="#" className="text-[#ee792d] hover:text-[#d36620] underline">
                        Terms and Conditions
                      </a>
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                />
              </div>

              <Button
                type="submit"
                className="bg-gradient-to-r from-[#ee792d] to-[#02557a] hover:shadow-lg transition-all"
                fullWidth
                size="lg"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register Now"}
              </Button>

              <Typography variant="paragraph" className="text-center text-gray-600 font-medium mt-4">
                Already have an account?{" "}
                <Link to="/auth/sign-in" className="text-[#02557a] hover:text-[#59b94f] transition-colors font-semibold ml-1">
                  Sign in
                </Link>
              </Typography>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SignUp;