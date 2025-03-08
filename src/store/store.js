import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "./slices/doctorSlice";
import getAllDataReducer from "./slices/getDisplayAllData";
import staffReducer from "./slices/getStaffSlice";


import challanReducer from "./slices/challanSlice";
import gramPanchayatReducer from "./slices/grampanchayatSlice"
import agreementStatusReducer from './slices/agreementStetusSlice';
import deductionsReducer from './slices/exportDeductionsDataSlice';
import adminUploadDDocumentsReducer from './slices/AdminUploadDDFile';
import forgotPasswordReducer from "./slices/forgotResetPasswordSlice";


import paymentDocumentsReducer from "./slices/forAllDataAccesInOneFrameSlice";
// import diagnosisReducer from "./slices/detailDiagnosisSlice";
// import appointmentsReducer from "./slices/appointmentSlice";
// import timelineReducer from "./slices/timelineSlice";
// import softwareApplicationReducer from "./slices/softwareApplicationSlice";
// import onlineTestReducer from "./slices/onlineTestSlice";
// import  onlineTestTransactionReducer from "./slices/onlineTestTransactionSlice";

export const store = configureStore({
  reducer: {
    doctor: doctorReducer,
    getAllData : getAllDataReducer,
    staff : staffReducer,

    paymentDocuments : paymentDocumentsReducer,

    challan: challanReducer,
    grampanchayat: gramPanchayatReducer,
    agreementStatus: agreementStatusReducer,
    deductions:deductionsReducer,
    adminUploadDDocuments : adminUploadDDocumentsReducer,
    forgotPassword: forgotPasswordReducer,
    // diagnosis: diagnosisReducer,
    // appointments: appointmentsReducer,
    // timeline: timelineReducer,
    // softwareApplications: softwareApplicationReducer,
    // onlineTests: onlineTestReducer,
    // onlineTestTransaction:onlineTestTransactionReducer,
  },
});
