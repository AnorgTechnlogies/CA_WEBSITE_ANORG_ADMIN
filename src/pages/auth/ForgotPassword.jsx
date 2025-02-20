import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { forgotPassword, verifyForgotPasswordCode, clearAllForgotResetPassErrors } from '../../store/slices/forgotResetPasswordSlice';

export function ForgotPassword(){
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
    <div className="flex items-center justify-center min-h-screen bg-blue-gray-50/50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Reset Password
          </Typography>
        </CardHeader>

        <CardBody className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{message}</span>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <Input
                type="email"
                label="Email Address"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                variant="gradient"
                fullWidth
                type="submit"
                disabled={loading}
                className="mt-4"
              >
                {loading ? "Sending..." : "Send Reset Code"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <Input
                type="text"
                label="Verification Code"
                size="lg"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <Input
                type="password"
                label="New Password"
                size="lg"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Input
                type="password"
                label="Confirm Password"
                size="lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordError && (
                <div className="text-red-500 text-sm">{passwordError}</div>
              )}
              <Button
                variant="gradient"
                fullWidth
                type="submit"
                disabled={loading}
                className="mt-4"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}
        </CardBody>

        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-4 text-center">
            Remember your password?{" "}
            <a href="/login" className="text-blue-500 font-bold">
              Sign In
            </a>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;