import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "@/store/slices/doctorSlice";
import { ToastContainer, toast } from 'react-toastify';
import pitaxLogo from "../../../public/img/logo.jpg"
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export function SignIn() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.doctor);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    if (message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminEmailId = e.target.adminEmailId.value;
    const adminPassword = e.target.adminPassword.value;
    dispatch(login(adminEmailId, adminPassword));
  };

  return (
    <div className="min-h-screen bg-white flex p-2">
      <ToastContainer />

      {/* Left side - Gradient Background with Logo */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ee792d] via-[#02557a] to-[#59b94f] rounded-l-3xl">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            {/* Your logo here */}
            <img
              src={pitaxLogo}
              alt="PITAX Logo"
              className="max-w-xs w-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-4 sm:px-6 lg:px-20 xl:px-24">
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
              PITAX Head Office Admin Portal
            </Typography>
          </div>
    
          <Card className="p-8 shadow-lg rounded-2xl bg-white">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Typography variant="small" className="text-gray-700 font-semibold">
                  Admin Email
                </Typography>
                <Input
                  name="adminEmailId"
                  size="lg"
                  placeholder="Enter Your Email"
                  className="!border-gray-300 focus:!border-[#02557a]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                />
              </div>
    
              <div className="space-y-2">
                <Typography variant="small" className="text-gray-700 font-semibold">
                  Password
                </Typography>
                <Input
                  name="adminPassword"
                  type="password"
                  size="lg"
                  placeholder="Enter Your Password"
                  className="!border-gray-300 focus:!border-[#02557a]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                />
              </div>
    
              <div className="flex items-center justify-end">
                <Link
                  to="/auth/ForgotPassword"
                  className="text-sm font-semibold text-[#ee792d] hover:text-[#d36620]"
                >
                  Forgot password?
                </Link>
              </div>
    
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#ee792d] to-[#02557a] hover:shadow-lg transition-all"
                fullWidth
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
    
              <div className="mt-4">
                <Checkbox
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
              
              <Typography variant="paragraph" className="text-center text-gray-600 font-medium mt-4">
                Not registered?{" "}
                <Link to="/auth/sign-up" className="text-[#02557a] hover:text-[#59b94f] transition-colors font-semibold ml-1">
                  Create account
                </Link>
              </Typography>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SignIn;