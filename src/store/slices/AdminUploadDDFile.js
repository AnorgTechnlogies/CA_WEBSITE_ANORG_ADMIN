import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_KEY;

const initialState = {
  loading: false,
  error: null,
  message: null,
  documents: { gst: null, it: null, kaamgar: null, royalty: null, insurance: null },
};

const adminDocumentsSlice = createSlice({
  name: "adminUploadDDocuments",
  initialState,
  reducers: {
    documentUpdateRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    documentUpdateSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.documents[action.payload.type] = action.payload.result;
    },
    documentUpdateFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearErrors(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
    },
  },
});

// Action creators for document updates
export const updateGSTDocument = (id, documentData) => async (dispatch) => {
  try {
    dispatch(adminDocumentsSlice.actions.documentUpdateRequest());
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.patch(`${BASE_URL}/api/admin/updateGSTDocumentByAdmin/${id}`, documentData, config);
    dispatch(adminDocumentsSlice.actions.documentUpdateSuccess({
      type: 'gst',
      message: response.data.message,
      result: response.data.result,
    }));
  } catch (error) {
    dispatch(adminDocumentsSlice.actions.documentUpdateFailed(
      error.response?.data?.message || "Error updating GST document"
    ));
  }
};

export const updateITDocument = (id, documentData) => async (dispatch) => {
  try {
    dispatch(adminDocumentsSlice.actions.documentUpdateRequest());
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.patch(`${BASE_URL}/api/admin/updatITDocumentByAdmin/${id}`, documentData, config);
    dispatch(adminDocumentsSlice.actions.documentUpdateSuccess({
      type: 'it',
      message: response.data.message,
      result: response.data.result,
    }));
  } catch (error) {
    dispatch(adminDocumentsSlice.actions.documentUpdateFailed(
      error.response?.data?.message || "Error updating IT document"
    ));
  }
};

export const updateKaamgarDocument = (id, documentData) => async (dispatch) => {
  try {
    dispatch(adminDocumentsSlice.actions.documentUpdateRequest());
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.patch(`${BASE_URL}/api/admin/updateKaamgarDocumentByAdmin/${id}`, documentData, config);
    dispatch(adminDocumentsSlice.actions.documentUpdateSuccess({
      type: 'kaamgar',
      message: response.data.message,
      result: response.data.result,
    }));
  } catch (error) {
    dispatch(adminDocumentsSlice.actions.documentUpdateFailed(
      error.response?.data?.message || "Error updating Kaamgar document"
    ));
  }
};

export const updateRoyaltyDocument = (id, documentData) => async (dispatch) => {
  try {
    dispatch(adminDocumentsSlice.actions.documentUpdateRequest());
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.patch(`${BASE_URL}/api/admin/updateRoyaltyDocumentByAdmin/${id}`, documentData, config);
    dispatch(adminDocumentsSlice.actions.documentUpdateSuccess({
      type: 'royalty',
      message: response.data.message,
      result: response.data.result,
    }));
  } catch (error) {
    dispatch(adminDocumentsSlice.actions.documentUpdateFailed(
      error.response?.data?.message || "Error updating Royalty document"
    ));
  }
};

export const updateInsuranceDocument = (id, documentData) => async (dispatch) => {
  try {
    dispatch(adminDocumentsSlice.actions.documentUpdateRequest());
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.patch(`${BASE_URL}/api/admin/updateInsuranceDocumentByAdmin/${id}`, documentData, config);
    dispatch(adminDocumentsSlice.actions.documentUpdateSuccess({
      type: 'insurance',
      message: response.data.message,
      result: response.data.result,
    }));
  } catch (error) {
    dispatch(adminDocumentsSlice.actions.documentUpdateFailed(
      error.response?.data?.message || "Error updating Insurance document"
    ));
  }
};

// Utility actions
export const clearErrors = () => (dispatch) => {
  dispatch(adminDocumentsSlice.actions.clearErrors());
};

export const clearMessage = () => (dispatch) => {
  dispatch(adminDocumentsSlice.actions.clearMessage());
};

export default adminDocumentsSlice.reducer;