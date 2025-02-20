import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPassSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    verifyForgotPasswordCodeRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    verifyForgotPasswordCodeSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    verifyForgotPasswordCodeFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});


const BASE_URL=import.meta.env.VITE_API_KEY;

console.log(import.meta.env.VITE_API_KEY);

// Forgot password action (sending the code)
export const forgotPassword = (adminEmailId) => async (dispatch) => {
  try {
    dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());
    const response = await axios.patch(
      `${BASE_URL}/api/admin/send-forgot-password-code`,
      { adminEmailId },
      // { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(
      forgotResetPassSlice.actions.forgotPasswordSuccess(response.data.message)
    );
  } catch (error) {
    dispatch(
      forgotResetPassSlice.actions.forgotPasswordFailed(
        error.response?.data?.message || "Error sending forgot password code!"
      )
    );
  }
};

// Verifying the forgot password code and resetting password
export const verifyForgotPasswordCode =
  (adminEmailId, providedCode, newPassword) => async (dispatch) => {
    try {
      dispatch(forgotResetPassSlice.actions.verifyForgotPasswordCodeRequest());
      const response = await axios.patch(
        `${BASE_URL}/api/admin/verify-forgot-password-code`,
        { adminEmailId, providedCode, newPassword },
        // { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      dispatch(
        forgotResetPassSlice.actions.verifyForgotPasswordCodeSuccess(
          response.data.message
        )
      );
    } catch (error) {
      dispatch(
        forgotResetPassSlice.actions.verifyForgotPasswordCodeFailed(
          error.response?.data?.message || "Error verifying the code!"
        )
      );
    }
  };

// Clear all errors
export const clearAllForgotResetPassErrors = () => (dispatch) => {
  dispatch(forgotResetPassSlice.actions.clearAllErrors());
};

export default forgotResetPassSlice.reducer;