import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_KEY;

const agreementStatusSlice = createSlice({
  name: "agreementStatus",
  initialState: {
    loading: false,
    error: null,
    message: null,
    agreementData: null,
    agreements: [], // Make sure this is added
    count: 0       // Make sure this is added
  },
  reducers: {
    createAgreementRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createAgreementSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.agreementData = action.payload.data;
    },
    createAgreementFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    getAgreementRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAgreementSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.agreementData = action.payload;
    },
    getAgreementFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },


    getAgreementsByGrampanchayatRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAgreementsByGrampanchayatSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.agreements = action.payload.data;
      state.count = action.payload.count;
    },
    getAgreementsByGrampanchayatFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.agreements = [];
      state.count = 0;
    },


    clearAgreementErrors(state) {
      state.error = null;
      state.message = null;
    },
  },
});

// Create agreement status action
export const createAgreementStatus = (submitData) => async (dispatch) => {
  try {
        // Debug FormData contents
        // for (let pair of submitData.entries()) {
        //   console.log("FormData:", pair[0], pair[1]);
        // }

        console.log("submitData : ", submitData);
        

    dispatch(agreementStatusSlice.actions.createAgreementRequest());

    const response = await axios.post(
      `${BASE_URL}/api/staff/agreement-status`,
      submitData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    

    dispatch(
      agreementStatusSlice.actions.createAgreementSuccess({
        message: response.data.message,
        data: response.data.data,
      })
    );
  } catch (error) {
    dispatch(
      agreementStatusSlice.actions.createAgreementFailed(
        error.response?.data?.message || "Error creating agreement status!"
      )
    );
  }
};

// Get agreement status action
export const getAgreementStatus = (gpId) => async (dispatch) => {
  try {
    dispatch(agreementStatusSlice.actions.getAgreementRequest());
    
    const response = await axios.get(
      `${BASE_URL}/api/agreement-status/${gpId}`
    );

    dispatch(
      agreementStatusSlice.actions.getAgreementSuccess(response.data.data)
    );
  } catch (error) {
    dispatch(
      agreementStatusSlice.actions.getAgreementFailed(
        error.response?.data?.message || "Error fetching agreement status!"
      )
    );
  }
};

export const getAgreementsByGrampanchayat = (grampanchayatId) => async (dispatch) => {

  console.log("These is grampanchayat id :", grampanchayatId);
  
  try {
    dispatch(agreementStatusSlice.actions.getAgreementsByGrampanchayatRequest());
    
    const response = await axios.get(
      `${BASE_URL}/api/admin/agreements/${grampanchayatId}`,
      {
        withCredentials: true
      }
    );

    dispatch(
      agreementStatusSlice.actions.getAgreementsByGrampanchayatSuccess({
        data: response.data.data,
        count: response.data.count
      })
    );
  } catch (error) {
    dispatch(
      agreementStatusSlice.actions.getAgreementsByGrampanchayatFailed(
        error.response?.data?.message || "Error fetching agreements!"
      )
    );
  }
};

// Clear all errors
export const clearAgreementErrors = () => (dispatch) => {
  dispatch(agreementStatusSlice.actions.clearAgreementErrors());
};

export default agreementStatusSlice.reducer;