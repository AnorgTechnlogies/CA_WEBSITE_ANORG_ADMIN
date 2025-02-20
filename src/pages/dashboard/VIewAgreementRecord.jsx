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
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 w-full">
        <Alert color="red">{error}</Alert>
      </div>
    );
  }

  const TABLE_HEAD = ["Date", "OC Copy Status", "Payment Status", "Payment Date", "OC Copy"];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Agreement Records
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
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
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={agreement._id}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {format(new Date(agreement.date), 'dd/MM/yyyy')}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Chip
                        variant="gradient"
                        value={agreement.oCCopyReceived ? "Received" : "Pending"}
                        color={agreement.oCCopyReceived ? "green" : "amber"}
                        className="py-0.5 px-2 text-[11px] font-medium text-center"
                      />
                    </td>
                    <td className={classes}>
                      <Chip
                        variant="gradient"
                        value={agreement.paymentReceived ? "Received" : "Pending"}
                        color={agreement.paymentReceived ? "green" : "amber"}
                        className="py-0.5 px-2 text-[11px] font-medium text-center"
                      />
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal ">
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
                          className="py-0.5 px-2 text-[11px] font-medium cursor-pointer"
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
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
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