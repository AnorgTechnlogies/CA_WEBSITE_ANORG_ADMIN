import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAgreementsByGrampanchayat } from '../../store/slices/agreementStetusSlice';
import { format } from 'date-fns';

// Import Material Tailwind components properly
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Spinner,
  Alert,
  Chip,
} from "@material-tailwind/react";
import { useParams } from 'react-router-dom';


export function ViewAgreementRecord() {
  const { gpId } = useParams();
  const dispatch = useDispatch();
  const { agreements, loading, error } = useSelector((state) => state.agreementStatus);

  useEffect(() => {
    if (gpId) {
      dispatch(getAgreementsByGrampanchayat(gpId));
    }
  }, [dispatch, gpId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner className="h-12 w-12 text-[#ee792d]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 w-full">
        <Alert color="red" className="border-l-4 border-[#ee792d] bg-white text-black">{error}</Alert>
      </div>
    );
  }

  const TABLE_HEAD = ["Date", "OC Copy Status", "Payment Status", "Payment Date", "OC Copy"];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="shadow-lg rounded-xl">
        <CardHeader variant="gradient" className="mb-8 p-6 bg-[#02557a]">
          <Typography variant="h6" color="white" className="font-medium">
            Agreement Records
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr className="bg-gray-50">
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-gray-200 py-3 px-5 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-[#02557a]"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agreements?.map((agreement, index) => {
                const isLast = index === agreements.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-gray-200";
                const rowClass = index % 2 === 0 ? "bg-white" : "bg-gray-50";

                return (
                  <tr key={agreement._id} className={rowClass}>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal text-gray-700">
                        {format(new Date(agreement.date), 'dd/MM/yyyy')}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Chip
                        variant="gradient"
                        value={agreement.oCCopyReceived ? "Received" : "Pending"}
                        color={agreement.oCCopyReceived ? "green" : "amber"}
                        className={`py-0.5 px-2 text-[11px] font-medium text-center ${
                          agreement.oCCopyReceived 
                            ? "bg-[#59b94f] text-white" 
                            : "bg-[#ee792d] text-white"
                        }`}
                      />
                    </td>
                    <td className={classes}>
                      <Chip
                        variant="gradient"
                        value={agreement.paymentReceived ? "Received" : "Pending"}
                        color={agreement.paymentReceived ? "green" : "amber"}
                        className={`py-0.5 px-2 text-[11px] font-medium text-center ${
                          agreement.paymentReceived 
                            ? "bg-[#59b94f] text-white" 
                            : "bg-[#ee792d] text-white"
                        }`}
                      />
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal text-gray-700">
                        {agreement.paymentReceivedDate ? 
                          format(new Date(agreement.paymentReceivedDate), 'dd/MM/yyyy') : 
                          '-'}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {agreement.uploadedOCCopy?.url ? (
                        <Chip
                          variant="gradient"
                          value="View Document"
                          color="blue"
                          className="py-0.5 px-2 text-[11px] font-medium cursor-pointer bg-[#02557a] text-white hover:bg-[#023e59] transition-colors"
                          onClick={() => window.open(agreement.uploadedOCCopy.url, '_blank')}
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                );
              })}
              {!agreements?.length && (
                <tr className="bg-white">
                  <td colSpan={5} className="text-center p-6 border-t border-gray-200">
                    <Typography variant="small" className="font-normal text-gray-600">
                      No agreement records found
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default ViewAgreementRecord;