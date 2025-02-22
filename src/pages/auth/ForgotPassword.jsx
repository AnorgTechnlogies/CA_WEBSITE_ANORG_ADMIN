import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import pitaxLogo from "../../../public/img/logo.jpg"
import { forgotPassword, verifyForgotPasswordCode, clearAllForgotResetPassErrors } from '../../store/slices/forgotResetPasswordSlice';

export function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.forgotPassword);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    return () => {
      dispatch(clearAllForgotResetPassErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    if (message && step === 1) {
      setStep(2);
    }
  }, [message]);

  const handleSendCode = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setPasswordError('');
    dispatch(verifyForgotPasswordCode(email, code, newPassword));
  };

  return (
    <div className="min-h-screen bg-white flex p-2">
      {/* Left side - Reset Password Form */}
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
              Reset Password
            </Typography>
            <Typography variant="h4" className="text-xl text-gray-600 font-normal">
              PITAX Admin Portal
            </Typography>
          </div>
    
          <Card className="p-8 shadow-lg rounded-2xl bg-white">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                <span className="block sm:inline">{message}</span>
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSendCode} className="space-y-6">
                <div className="space-y-2">
                  <Typography variant="small" className="text-gray-700 font-semibold">
                    Email Address
                  </Typography>
                  <Input
                    type="email"
                    size="lg"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="!border-gray-300 focus:!border-[#02557a]"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
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
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Reset Code"
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-2">
                  <Typography variant="small" className="text-gray-700 font-semibold">
                    Verification Code
                  </Typography>
                  <Input
                    type="text"
                    size="lg"
                    placeholder="Enter verification code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="!border-gray-300 focus:!border-[#02557a]"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  <Typography variant="small" className="text-gray-700 font-semibold">
                    New Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
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
                    type="password"
                    size="lg"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="!border-gray-300 focus:!border-[#02557a]"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {passwordError && (
                    <div className="text-red-500 text-sm mt-1">{passwordError}</div>
                  )}
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
                      <span>Resetting...</span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            )}
            
            <Typography variant="paragraph" className="text-center text-gray-600 font-medium mt-6">
              Remember your password?{" "}
              <Link to="/auth/sign-in" className="text-[#02557a] hover:text-[#59b94f] transition-colors font-semibold ml-1">
                Sign In
              </Link>
            </Typography>
          </Card>
        </div>
      </div>
        {/* Right side - Gradient Background with Logo */}
        <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ee792d] via-[#02557a] to-[#59b94f] rounded-r-3xl xl:rounded-r-[60px]">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            {/* Logo */}
            <img
              src={pitaxLogo}
              alt="PITAX Logo"
              className="max-w-xs w-full object-contain"
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default ForgotPassword;