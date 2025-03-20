import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const paymentDocumentSlice = createSlice({
  name: "paymentDocuments",
  initialState: {
    loading: false,
    error: null,
    message: null,
    documents: [],
    document: null,
    allDeductions: [], // For storing all deduction entries
    pagination: {
      total: 0,
      currentPage: 1,
      totalPages: 1,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false
    },
    summary: {
      totalGST: 0,
      totalRoyalty: 0,
      totalIT: 0,
      totalKamgaar: 0,
      totalInsurance: 0,
      grandTotal: 0
    },
    filters: {
      startDate: null,
      endDate: null,
      gstNo: "",
      paymentMode: "",
      seenByAdmin: "",
      sortBy: "date",
      sortOrder: "desc"
    },
    updateLoading: false
  },
  reducers: {
    // Get all deductions
    getAllDeductionsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllDeductionsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.allDeductions = action.payload.data.deductions;
      state.pagination = action.payload.data.pagination;
      state.summary = action.payload.data.summary;
    },
    getAllDeductionsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.allDeductions = [];
    },
    
    // Update deduction status actions
    updateDeductionRequest(state) {
      state.updateLoading = true;
      state.error = null;
    },
    updateDeductionSuccess(state, action) {
      state.updateLoading = false;
      state.message = action.payload.message;
      
      // Update the deduction in the list
      state.allDeductions = state.allDeductions.map(deduction => 
        deduction._id === action.payload.data._id ? action.payload.data : deduction
      );
    },
    updateDeductionFailed(state, action) {
      state.updateLoading = false;
      state.error = action.payload;
    },
    
    // Update filter values
    updateFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    
    // Clear errors and messages
    clearAllErrors(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
    }
  },
});

const BASE_URL = import.meta.env.VITE_API_KEY;

// Get all deductions with filters, pagination, and sorting
export const getAllDeductions = (grampanchayatId, filters = {}, page = 1, limit = 10) => async (dispatch, getState) => {
  try {
    dispatch(paymentDocumentSlice.actions.getAllDeductionsRequest());
    
    // Get current filters from state
    const currentFilters = getState().paymentDocuments.filters;
    
    // Combine current filters with new filters
    const combinedFilters = {
      ...currentFilters,
      ...filters,
    };
    
    // Update filters in state
    dispatch(paymentDocumentSlice.actions.updateFilters(filters));
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('page', page);
    queryParams.append('limit', limit);
    
    // Add filters to query params if they have values
    if (combinedFilters.startDate) queryParams.append('startDate', combinedFilters.startDate);
    if (combinedFilters.endDate) queryParams.append('endDate', combinedFilters.endDate);
    if (combinedFilters.gstNo) queryParams.append('gstNo', combinedFilters.gstNo);
    if (combinedFilters.paymentMode) queryParams.append('paymentMode', combinedFilters.paymentMode);
    if (combinedFilters.seenByAdmin !== "") queryParams.append('seenByAdmin', combinedFilters.seenByAdmin);
    if (combinedFilters.sortBy) queryParams.append('sortBy', combinedFilters.sortBy);
    if (combinedFilters.sortOrder) queryParams.append('sortOrder', combinedFilters.sortOrder);
    
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    
    const response = await axios.get(
      `${BASE_URL}/api/admin/getAllDeductions/${grampanchayatId}?${queryParams.toString()}`,
      config
    );
    
    dispatch(
      paymentDocumentSlice.actions.getAllDeductionsSuccess(response.data)
    );
    
    return response.data;
  } catch (error) {
    dispatch(
      paymentDocumentSlice.actions.getAllDeductionsFailed(
        error.response?.data?.message || "Error fetching deductions!"
      )
    );
    return null;
  }
};

// Update deduction (Mark as seen and/or upload document)
export const updateDeductionByAdmin = (deductionId, formData) => async (dispatch) => {
  console.log("deductionId : ", deductionId);
  console.log("formData : ", formData);
  
  try {
    dispatch(paymentDocumentSlice.actions.updateDeductionRequest());
    
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    
    const response = await axios.put(
      `${BASE_URL}/api/admin/updateDeductionByAdmin/${deductionId}`,
      formData,
      config
    );
    
    dispatch(
      paymentDocumentSlice.actions.updateDeductionSuccess(response.data)
    );
    
    return response.data;
  } catch (error) {
    dispatch(
      paymentDocumentSlice.actions.updateDeductionFailed(
        error.response?.data?.message || "Error updating deduction!"
      )
    );
    return null;
  }
};

// Clear all errors
export const clearAllPaymentDocumentErrors = () => (dispatch) => {
  dispatch(paymentDocumentSlice.actions.clearAllErrors());
};

// Clear message
export const clearPaymentDocumentMessage = () => (dispatch) => {
  dispatch(paymentDocumentSlice.actions.clearMessage());
};

export default paymentDocumentSlice.reducer;