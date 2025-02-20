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
    <div className="min-h-screen bg-gray-50 flex p-2">
    {/* Left side - Login Form */}
    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-lg">
        <div className="text-center mb-12">
          <Typography variant="h1" className="text-4xl font-bold text-gray-900 mb-3">
            Welcome to PITAX
          </Typography>
          <Typography variant="h6" className="text-xl text-gray-600 font-normal">
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
                className="!border-gray-300 focus:!border-gray-900"
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
                className="!border-gray-300 focus:!border-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
              />
            </div>
  
            <div className="flex items-center justify-end">
              
              <Link
                to="/auth/ForgotPassword"
                className="text-sm font-semibold text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>
  
            <Button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 transition-colors"
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
                label={
                  <Typography variant="small" className="font-medium text-gray-700">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
            </div>
            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
          </form>
        </Card>
      </div>
    </div>
  
    {/* Right side - Image */}
    <div className="hidden lg:block relative w-0 flex-1">
      <div className="absolute inset-0">
        <img
          src="/img/pattern.png"
          alt="Background pattern"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-20 mix-blend-multiply rounded-l-3xl xl:rounded-l-[60px]" />
      </div>
    </div>

    
  
    <ToastContainer />
  </div>
  
  );
}

export default SignIn;