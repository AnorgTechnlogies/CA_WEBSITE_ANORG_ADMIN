import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStaff } from "../../store/slices/doctorSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function AddTehsilBlock() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.doctor);
  
  // State management
  const [formData, setFormData] = useState({
    staffState: "",
    staffDist: "",
    staffTahsil: "",
    staffName : "",
    staffEmail: "",
    staffPassword: "",
    staffMobileNo: "",
    staffImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_KEY;

  // Handle form submission success/error
  useEffect(() => {
    if (isSubmitting) {
      if (success) {
        toast.success("Tehsil Block added successfully!");
        handleCancel();
        setIsSubmitting(false);
      }
      if (error) {
        toast.error(error || "Failed to add Tehsil Block");
        setIsSubmitting(false);
      }
    }
  }, [success, error, isSubmitting]);

  // Input handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      e.target.value = null;
      return;
    }

    if (!file.type.match('image.*')) {
      toast.error("Please select an image file");
      e.target.value = null;
      return;
    }

    setFormData(prev => ({
      ...prev,
      staffImage: file
    }));

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const submitFormData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'staffImage' && formData[key]) {
        submitFormData.append(key, formData[key]);
      } else {
        submitFormData.append(key, formData[key]);
      }
    });

    setIsSubmitting(true);
    dispatch(addStaff(submitFormData));
  };

  // Reset form
  const handleCancel = () => {
    setFormData({
      staffState: "",
      staffDist: "",
      staffTahsil: "",
      staffName: "",
      staffEmail: "",
      staffPassword: "",
      staffMobileNo: "",
      staffImage: null,
      grampanchayats: []
    });
    setImagePreview(null);
    document.getElementById('staffImage').value = '';
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" style={{ background: "linear-gradient(to right, #02557a, #59b94f)" }} className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Tahsil Block Registration Form
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="w-full px-6">
            <form className="mt-8 mb-2" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info Fields */}

                <Input
                  type="text"
                  name="staffState"
                  value={formData.staffState}
                  onChange={handleChange}
                  label="Tehsil Block State Name"
                  required
                  className="w-full"
                  style={{ color: "#02557a" }}
                />

                <Input
                  type="text"
                  name="staffDist"
                  value={formData.staffDist}
                  onChange={handleChange}
                  label="Tehsil Block District Name"
                  required
                  className="w-full"
                  style={{ color: "#02557a" }}
                />

                <Input
                  type="text"
                  name="staffTahsil"
                  value={formData.staffTahsil}
                  onChange={handleChange}
                  label="Tehsil Name"
                  required
                  className="w-full"
                  style={{ color: "#02557a" }}
                />

                <Input
                  type="text"
                  name="staffName"
                  value={formData.staffName}
                  onChange={handleChange}
                  label="Tehsil staff Name"
                  required
                  className="w-full"
                  style={{ color: "#02557a" }}
                />

                <Input
                  type="email"
                  name="staffEmail"
                  value={formData.staffEmail}
                  onChange={handleChange}
                  label="Tehsil Block Email"
                  required
                  className="w-full"
                  style={{ color: "#02557a" }}
                />

                <Input
                  type="tel"
                  name="staffMobileNo"
                  value={formData.staffMobileNo}
                  onChange={handleChange}
                  label="Tehsil Block Mobile Number"
                  required
                  className="w-full"
                  style={{ color: "#02557a" }}
                />

                <Input
                  type="password"
                  name="staffPassword"
                  value={formData.staffPassword}
                  onChange={handleChange}
                  label="Tehsil Block Password"
                  required
                  className="w-full"
                  style={{ color: "#02557a" }}
                />

                {/* Image Upload */}
                <div className="col-span-2">
                  <Input
                    type="file"
                    id="staffImage"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full"
                    style={{ color: "#02557a" }}
                  />
                  {imagePreview && (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="mt-4 w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="mt-6 flex justify-end gap-4">
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  style={{ borderColor: "#ee792d", color: "#ee792d" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading || isSubmitting}
                  style={{ backgroundColor: "#59b94f", color: "white" }}
                >
                  {(loading || isSubmitting) ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default AddTehsilBlock;