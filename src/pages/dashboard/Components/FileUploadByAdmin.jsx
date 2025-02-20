import React, { useState, useEffect } from 'react';
import { Button, Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, clearMessage } from '@/store/slices/AdminUploadDDFile';

export function FileUploadComponent({ onUpload, fileId, type }) {
  const [file, setFile] = useState(null);
  const [isToastShown, setIsToastShown] = useState(false);
  const dispatch = useDispatch();

  const { loading: uploadLoading, error, message } = useSelector(
    (state) => state.adminUploadDDocuments
  );

  useEffect(() => {
    if (error && !isToastShown) {
      setIsToastShown(true);
      toast.error(error);
      dispatch(clearErrors());
      setFile(null);
      // Reset the flag after a short delay
      setTimeout(() => setIsToastShown(false), 100);
    }
    if (message && !isToastShown) {
      setIsToastShown(true);
      toast.success(message);
      dispatch(clearMessage());
      setFile(null);
      // Reset the flag after a short delay
      setTimeout(() => setIsToastShown(false), 100);
    }
  }, [error, message, dispatch, isToastShown]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Please upload only JPG, PNG or PDF files');
        e.target.value = null;
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }
    const formData = new FormData();
    formData.append('document', file);

    try {
      await onUpload(fileId, formData);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Input
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileChange}
        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
        disabled={uploadLoading}
      />
      
      {file && (
        <Button
          onClick={handleUpload}
          disabled={uploadLoading}
          className="flex items-center gap-3"
        >
          {uploadLoading ? (
            <span>Uploading...</span>
          ) : (
            <span>Upload {type} Document</span>
          )}
        </Button>
      )}
    </div>
  );
}

export default FileUploadComponent;