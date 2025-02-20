import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_KEY;

const challanSlice = createSlice({
  name: "challan",
  initialState: {
    loading: false,
    error: null,
    message: null,
    gstEntries: [],
    insuranceEntries: [],
    kamgarEntries: [],
    royaltyEntries: [],
    itEntries: [],
    currentGrampanchayat: null
  },
  reducers: {
    // GST Reducers
    createGSTRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createGSTSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.gstEntries.push(action.payload.data);
    },
    createGSTFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Insurance Reducers
    createInsuranceRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createInsuranceSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.insuranceEntries.push(action.payload.data);
    },
    createInsuranceFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Kamgar Reducers
    createKamgarRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createKamgarSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.kamgarEntries.push(action.payload.data);
    },
    createKamgarFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Royalty Reducers
    createRoyaltyRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createRoyaltySuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.royaltyEntries.push(action.payload.data);
    },
    createRoyaltyFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // IT Reducers
    createITRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createITSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.itEntries.push(action.payload.data);
    },
    createITFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },



    getEntriesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getGSTEntriesSuccess(state, action) {
      state.loading = false;
      state.gstEntries = action.payload.data;
    },
    getInsuranceEntriesSuccess(state, action) {
      state.loading = false;
      state.insuranceEntries = action.payload.data;
    },
    getKamgarEntriesSuccess(state, action) {
      state.loading = false;
      state.kamgarEntries = action.payload.data;
    },
    getRoyaltyEntriesSuccess(state, action) {
      state.loading = false;
      state.royaltyEntries = action.payload.data;
    },
    getITEntriesSuccess(state, action) {
      state.loading = false;
      state.itEntries = action.payload.data;
    },
    getEntriesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },



    updateEntryRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateGSTEntrySuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      const index = state.gstEntries.findIndex(entry => entry._id === action.payload.data._id);
      if (index !== -1) {
        state.gstEntries[index] = action.payload.data;
      }
    },
    updateInsuranceEntrySuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      const index = state.insuranceEntries.findIndex(entry => entry._id === action.payload.data._id);
      if (index !== -1) {
        state.insuranceEntries[index] = action.payload.data;
      }
    },
    updateKamgarEntrySuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      const index = state.kamgarEntries.findIndex(entry => entry._id === action.payload.data._id);
      if (index !== -1) {
        state.kamgarEntries[index] = action.payload.data;
      }
    },
    updateRoyaltyEntrySuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      const index = state.royaltyEntries.findIndex(entry => entry._id === action.payload.data._id);
      if (index !== -1) {
        state.royaltyEntries[index] = action.payload.data;
      }
    },
    updateITEntrySuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      const index = state.itEntries.findIndex(entry => entry._id === action.payload.data._id);
      if (index !== -1) {
        state.itEntries[index] = action.payload.data;
      }
    },
    updateEntryFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Set Current Grampanchayat
    setCurrentGrampanchayat(state, action) {
      state.currentGrampanchayat = action.payload;
    },

    // Clear Errors
    clearErrors(state) {
      state.error = null;
    },

    // Clear Message
    clearMessage(state) {
      state.message = null;
    }
  }
});

// Action Creators
export const createGSTEntry = (gstData, grampanchayatId) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.createGSTRequest());

    const response = await axios.post(
      `${BASE_URL}/api/staff/gst/${grampanchayatId}`,
      gstData,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
    );

    dispatch(challanSlice.actions.createGSTSuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.createGSTFailed(
        error.response?.data?.message || "Error creating GST entry"
      )
    );
  }
};

export const createInsuranceEntry = (insuranceData, grampanchayatId) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.createInsuranceRequest());

    const response = await axios.post(
      `${BASE_URL}/api/staff/insurance/${grampanchayatId}`,
      insuranceData,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
    );

    dispatch(challanSlice.actions.createInsuranceSuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.createInsuranceFailed(
        error.response?.data?.message || "Error creating insurance entry"
      )
    );
  }
};

export const createKamgarEntry = (kamgarData, grampanchayatId) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.createKamgarRequest());

    const response = await axios.post(
      `${BASE_URL}/api/staff/kamgar/${grampanchayatId}`,
      kamgarData,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
    );

    dispatch(challanSlice.actions.createKamgarSuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.createKamgarFailed(
        error.response?.data?.message || "Error creating kamgar entry"
      )
    );
  }
};

export const createRoyaltyEntry = (royaltyData, grampanchayatId) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.createRoyaltyRequest());

    const response = await axios.post(
      `${BASE_URL}/api/staff/royalty/${grampanchayatId}`,
      royaltyData,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
    );

    dispatch(challanSlice.actions.createRoyaltySuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.createRoyaltyFailed(
        error.response?.data?.message || "Error creating royalty entry"
      )
    );
  }
};

export const createITEntry = (itData, grampanchayatId) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.createITRequest());

    const response = await axios.post(
      `${BASE_URL}/api/staff/ITR/${grampanchayatId}`,
      itData,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
    );

    dispatch(challanSlice.actions.createITSuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.createITFailed(
        error.response?.data?.message || "Error creating IT entry"
      )
    );
  }
};


// New Action Creators for Getting Entries
export const getGSTEntries = (grampanchayatId) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.getEntriesRequest());
    const response = await axios.get(`${BASE_URL}/api/admin/gst/${grampanchayatId}`, {
      withCredentials: true,
    });
    dispatch(challanSlice.actions.getGSTEntriesSuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.getEntriesFailed(
        error.response?.data?.message || "Error fetching GST entries"
      )
    );
  }
};

export const getInsuranceEntries = (grampanchayatId) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.getEntriesRequest());
    const response = await axios.get(`${BASE_URL}/api/admin/insurance/${grampanchayatId}`, {
      withCredentials: true,
    });
    dispatch(challanSlice.actions.getInsuranceEntriesSuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.getEntriesFailed(
        error.response?.data?.message || "Error fetching insurance entries"
      )
    );
  }
};

export const getKamgarEntries = (grampanchayatId) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.getEntriesRequest());
    const response = await axios.get(`${BASE_URL}/api/admin/kamgar/${grampanchayatId}`, {
      withCredentials: true,
    });
    dispatch(challanSlice.actions.getKamgarEntriesSuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.getEntriesFailed(
        error.response?.data?.message || "Error fetching kamgar entries"
      )
    );
  }
};

export const getITEntries = (grampanchayatId) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.getEntriesRequest());
    const response = await axios.get(`${BASE_URL}/api/admin/iT/${grampanchayatId}`, {
      withCredentials: true,
    });
    dispatch(challanSlice.actions.getITEntriesSuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.getEntriesFailed(
        error.response?.data?.message || "Error fetching IT entries"
      )
    );
  }
};

export const getRoyaltyEntries = (grampanchayatId) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.getEntriesRequest());
    const response = await axios.get(`${BASE_URL}/api/admin/royalty/${grampanchayatId}`, {
      withCredentials: true,
    });
    dispatch(challanSlice.actions.getRoyaltyEntriesSuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.getEntriesFailed(
        error.response?.data?.message || "Error fetching royalty entries"
      )
    );
  }
};



export const updateGSTEntry = (id, updateData) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.updateEntryRequest());
    const response = await axios.put(
      `${BASE_URL}/api/admin/updateGSTEntry/${id}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
    );
    dispatch(challanSlice.actions.updateGSTEntrySuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.updateEntryFailed(
        error.response?.data?.message || "Error updating GST entry"
      )
    );
  }
};

export const updateInsuranceEntry = (entryId, updateData) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.updateEntryRequest());
    const response = await axios.put(
      `${BASE_URL}/api/admin/updateInsuranceEntry/${entryId}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
    );
    dispatch(challanSlice.actions.updateInsuranceEntrySuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.updateEntryFailed(
        error.response?.data?.message || "Error updating insurance entry"
      )
    );
  }
};

export const updateKamgarEntry = (entryId, updateData) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.updateEntryRequest());
    const response = await axios.put(
      `${BASE_URL}/api/admin/updateKamgarEntry/${entryId}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
    );
    dispatch(challanSlice.actions.updateKamgarEntrySuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.updateEntryFailed(
        error.response?.data?.message || "Error updating kamgar entry"
      )
    );
  }
};

export const updateRoyaltyEntry = (entryId, updateData) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.updateEntryRequest());
    const response = await axios.put(
      `${BASE_URL}/api/admin/updateRoyaltyEntry/${entryId}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
    );
    dispatch(challanSlice.actions.updateRoyaltyEntrySuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.updateEntryFailed(
        error.response?.data?.message || "Error updating royalty entry"
      )
    );
  }
};

export const updateITEntry = (entryId, updateData) => async (dispatch) => {
  try {
    dispatch(challanSlice.actions.updateEntryRequest());
    const response = await axios.put(
      `${BASE_URL}/api/admin/updateITEntry/${entryId}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
    );
    dispatch(challanSlice.actions.updateITEntrySuccess(response.data));
  } catch (error) {
    dispatch(
      challanSlice.actions.updateEntryFailed(
        error.response?.data?.message || "Error updating IT entry"
      )
    );
  }
};

// Set Current Grampanchayat Action
export const setCurrentGrampanchayat = (grampanchayat) => (dispatch) => {
  dispatch(challanSlice.actions.setCurrentGrampanchayat(grampanchayat));
};

// Clear Errors Action
export const clearErrors = () => (dispatch) => {
  dispatch(challanSlice.actions.clearErrors());
};

// Clear Message Action
export const clearMessage = () => (dispatch) => {
  dispatch(challanSlice.actions.clearMessage());
};

export default challanSlice.reducer;