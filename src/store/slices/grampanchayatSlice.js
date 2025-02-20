import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_KEY;

const grampanchayatSlice = createSlice({
  name: 'grampanchayat',
  initialState: {
    loading: false,
    grampanchayats: [],
    singleGrampanchayat: null, // Store a single GP data
    staffName: '',
    error: null
  },
  reducers: {
    getGrampanchayatsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getGrampanchayatsSuccess: (state, action) => {
      state.loading = false;
      // Check if response has nested structure
      const data = action.payload.data || action.payload;
      state.grampanchayats = data.grampanchayats || [];
      state.staffName = data.staffName || '';
      state.error = null;
      console.log("Data GP Recieved : ", data.grampanchayats);
      
    },
    getGrampanchayatsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getGrampanchayatsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSingleGrampanchayatSuccess: (state, action) => {
      state.loading = false;
      state.singleGrampanchayat = action.payload;
      state.error = null;
    },
    getSingleGrampanchayatFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getStaffGrampanchayats = () => async (dispatch) => {
  try {
    dispatch(getGrampanchayatsRequest());
    
    const response = await axios.get(
      `${BASE_URL}/api/staff/getStaffGrampanchayats`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
    );
    
    // Debug logs
    // console.log("Full API Response:", response);
    // console.log("Response Data:", response.data);
    
    // Pass the entire response data to the reducer
    dispatch(getGrampanchayatsSuccess(response.data));
    
  } catch (error) {
    // console.error("Full Error:", error);
    // console.error("Error Response:", error.response);
    dispatch(
      getGrampanchayatsFailed(
        error.response?.data?.message || "Error fetching grampanchayats"
      )
    );
  }
};

export const getGrampanchayatById = (gpId) => async (dispatch) => {
  try {
    dispatch(getGrampanchayatsRequest());

    const response = await axios.get(
      `${BASE_URL}/api/staff/getSingleGrampanchayatById/${gpId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(getSingleGrampanchayatSuccess(response.data));
  } catch (error) {
    dispatch(
      getSingleGrampanchayatFailed(
        error.response?.data?.message || "Error fetching grampanchayat"
      )
    );
  }
};

export const { 
  getGrampanchayatsRequest, 
  getGrampanchayatsSuccess, 
  getGrampanchayatsFailed ,
  getSingleGrampanchayatSuccess,
  getSingleGrampanchayatFailed,
} = grampanchayatSlice.actions;

export default grampanchayatSlice.reducer;