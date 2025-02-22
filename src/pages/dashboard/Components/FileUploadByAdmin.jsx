// FileUploadComponent.jsx
import React, { useState } from 'react';
import { Button, Input } from "@material-tailwind/react";
import { useSelector } from 'react-redux';

export function FileUploadComponent({ onUpload, fileId, type, hasExistingFile }) {
  const [file, setFile] = useState(null);
  const { loading: uploadLoading } = useSelector((state) => state.adminUploadDDocuments);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(selectedFile.type)) {
        e.target.value = null;
        setFile(null);
        return; // Parent will handle the error toast
      }
      setFile(selectedFile);
    }
  };
  
  const handleUpload = async () => {
    if (!file) {
      return; // Parent will handle the "no file" toast
    }
    const formData = new FormData();
    formData.append('document', file);
    await onUpload(fileId, formData);
    setFile(null); // Reset file input after upload
  };
  
  return (
    <div className="flex items-center gap-4">
      <Input
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileChange}
        className="!border-t-gray-300 focus:!border-t-[#59b94f]"
        labelProps={{
          className: "text-[#02557a]"
        }}
        disabled={uploadLoading || hasExistingFile}
      />
      {file && (
        <Button
          onClick={handleUpload}
          disabled={uploadLoading}
          className="flex items-center gap-3 bg-[#ee792d] hover:bg-[#d86a28] shadow-md"
        >
          {uploadLoading ? 
            <span className="flex items-center">
              <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
              Uploading...
            </span> : 
            <span>Upload {type} Document</span>
          }
        </Button>
      )}
    </div>
  );
}

export default FileUploadComponent;