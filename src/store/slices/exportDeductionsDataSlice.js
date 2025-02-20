import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_KEY;

const deductionSlice = createSlice({
  name: "deductions",
  initialState: {
    loading: false,
    error: null,
    message: null,
    deductionsData: {
      gst: [],
      insurance: [],
      it: [],
      kamgar: [],
      royalty: []
    },
    count: 0
  },
  reducers: {
    // Export Deductions Request
    exportDeductionsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    exportDeductionsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    },
    exportDeductionsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Get All Deductions Request
    getDeductionsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getDeductionsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.deductionsData = action.payload.data;
      state.count = action.payload.count;
    },
    getDeductionsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.deductionsData = {
        gst: [],
        insurance: [],
        it: [],
        kamgar: [],
        royalty: []
      };
      state.count = 0;
    },

    // Clear Errors
    clearDeductionErrors(state) {
      state.error = null;
      state.message = null;
    },
  },
});

// Export deductions action
export const exportDeductionsData = (grampanchayatId) => async (dispatch) => {
  try {
    dispatch(deductionSlice.actions.exportDeductionsRequest());

    const response = await axios.get(
      `${BASE_URL}/api/admin/exportAllDeductionData/${grampanchayatId}`,
      {
        withCredentials: true,
        responseType: 'blob', // Important for handling file download
      }
    );

    // Create a URL for the blob and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'deductions_data.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    dispatch(
      deductionSlice.actions.exportDeductionsSuccess({
        message: "Deductions exported successfully",
      })
    );
  } catch (error) {
    dispatch(
      deductionSlice.actions.exportDeductionsFailed(
        error.response?.data?.message || "Error exporting deductions!"
      )
    );
  }
};

// Get all deductions action
export const getAllDeductions = (grampanchayatId) => async (dispatch) => {
  try {
    dispatch(deductionSlice.actions.getDeductionsRequest());

    const response = await axios.get(
      `${BASE_URL}/api/admin/deductions/${grampanchayatId}`,
      {
        withCredentials: true
      }
    );

    dispatch(
      deductionSlice.actions.getDeductionsSuccess({
        data: response.data.data,
        count: response.data.count
      })
    );
  } catch (error) {
    dispatch(
      deductionSlice.actions.getDeductionsFailed(
        error.response?.data?.message || "Error fetching deductions!"
      )
    );
  }
};

// Clear all errors
export const clearDeductionErrors = () => (dispatch) => {
  dispatch(deductionSlice.actions.clearDeductionErrors());
};

export default deductionSlice.reducer;