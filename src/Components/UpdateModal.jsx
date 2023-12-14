/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Heading from "./Shared/Heading";
import ReactDatePicker from "react-datepicker";
import useToast from "./Shared/useToast";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";

const UpdateModal = ({
  rowData,
  open,
  setSelectedRowData,
  upcoming,
  upFetch,
}) => {
  const { user, refetch } = useAuth();
  const axiosSecure = useAxios();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowData("");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    {
      !upcoming &&
        axiosSecure
          .put(`/camp/${rowData.id}?email=${user?.email}`, data)
          .then((res) => {
            if (res.status === 200) {
              refetch();
              closeModal();
              toast.success({ content: "Camp Updated Successfully" });
            }
          })
          .catch((err) => {
            toast.error({ content: err.message });
          });
    }
    {
      upcoming &&
        axiosSecure
          .put(`/upcomingCamps/${rowData.id}?email=${user?.email}`, data)
          .then((res) => {
            if (res.status === 200) {
              upFetch();
              closeModal();
              toast.success({ content: "Camp Updated Successfully" });
            }
          })
          .catch((err) => {
            toast.error({ content: err.message });
          });
    }
  };

  return (
    <>
      <dialog
        id="my_modal_3"
        className="modal"
        open={isModalOpen}
        onClick={closeModal}
      >
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>
          <div className="my-12">
            {!upcoming ? (
              <Heading main={"Update"} sub={"Camp"}></Heading>
            ) : (
              <Heading main={"Update"} sub={"Upcoming Camp"}></Heading>
            )}
          </div>

          {/* update part  */}

          <form className="mb-12" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 mb-8">
              {/* camp name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Camp Name</span>
                </label>
                <label className="input-group">
                  <Controller
                    name="campName"
                    defaultValue={rowData?.campName}
                    control={control}
                    rules={{ required: "Camp Name is required" }}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        placeholder="Camp Name...."
                        className={`input input-bordered w-full ${
                          errors.campName ? "input-error" : ""
                        }`}
                      />
                    )}
                  />
                </label>
                {errors.campName && (
                  <span className="text-error">{errors.campName.message}</span>
                )}
              </div>
              {/* target audience */}
              <div className="form-control md:ml-4">
                <label className="label">
                  <span className="label-text">Target Audience</span>
                </label>
                <label className="input-group">
                  <Controller
                    name="targetAudience"
                    defaultValue={rowData?.targetAudience}
                    control={control}
                    rules={{ required: "Target Audience is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`select select-bordered w-full ${
                          errors.targetAudience ? "select-error" : ""
                        }`}
                        defaultValue=""
                      >
                        <option disabled value="">
                          Select Category. . .
                        </option>
                        <option value="general">General Health Checkup</option>
                        <option value="pediatric">Pediatric Health Camp</option>
                        <option value="women">Women's Health Camp</option>
                        <option value="senior">
                          Senior Citizens Health Camp
                        </option>
                        <option value="dental">Dental Health Camp</option>
                      </select>
                    )}
                  />
                </label>
                {errors.targetAudience && (
                  <span className="text-error">
                    {errors.targetAudience.message}
                  </span>
                )}
              </div>
            </div>
            {/* Specialized Services Provided */}
            <div className="md:flex mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Specialized Services Provided
                  </span>
                </label>
                <label className="input-group">
                  <Controller
                    name="services"
                    defaultValue={rowData?.services}
                    control={control}
                    rules={{ required: "Specialized Services are required" }}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        placeholder="Specialized Services...."
                        className={`input input-bordered w-full ${
                          errors.services ? "input-error" : ""
                        }`}
                      />
                    )}
                  />
                </label>
                {errors.services && (
                  <span className="text-error">{errors.services.message}</span>
                )}
              </div>
            </div>
            {/* Healthcare Professionals in Attendance */}
            {!upcoming && (
              <div className="md:flex mb-8">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">
                      Healthcare Professionals in Attendance
                    </span>
                  </label>
                  <label className="input-group">
                    <Controller
                      name="professionals"
                      defaultValue={rowData?.professionals}
                      control={control}
                      rules={{
                        required: "Healthcare Professionals are required",
                      }}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="Professional Lists...."
                          className={`input input-bordered w-full ${
                            errors.professionals ? "input-error" : ""
                          }`}
                        />
                      )}
                    />
                  </label>
                  {errors.professionals && (
                    <span className="text-error">
                      {errors.professionals.message}
                    </span>
                  )}
                </div>
              </div>
            )}
            {/* Venue Location */}
            <div className="md:flex mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Camp Location</span>
                </label>
                <label className="input-group">
                  <Controller
                    name="location"
                    defaultValue={rowData?.location}
                    control={control}
                    rules={{ required: "Venue Location is required" }}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        placeholder="Venue Location..."
                        className={`input input-bordered w-full ${
                          errors.location ? "input-error" : ""
                        }`}
                      />
                    )}
                  />
                </label>
                {errors.location && (
                  <span className="text-error">{errors.location.message}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Camp fees */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Camp Fees</span>
                </label>
                <label className="input-group">
                  <Controller
                    name="fees"
                    defaultValue={rowData?.fees}
                    control={control}
                    rules={{ required: "Camp Fees is required" }}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        placeholder="Camp Fees..."
                        className={`input input-bordered w-full ${
                          errors.fees ? "input-error" : ""
                        }`}
                      />
                    )}
                  />
                </label>
                {errors.fees && (
                  <span className="text-error">{errors.fees.message}</span>
                )}
              </div>

              {/* Date and Time */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Date and Time</span>
                </label>
                <label className="input-group">
                  <Controller
                    name="time"
                    defaultValue={new Date(rowData?.time)}
                    control={control}
                    rules={{ required: "Date and Time is required" }}
                    render={({ field }) => (
                      <ReactDatePicker
                        {...field}
                        onChange={(date) => {
                          field.onChange(date);
                        }}
                        selected={field.value}
                        showTimeSelect
                        timeFormat="h:mm aa"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select Date and Time..."
                        className={`input input-bordered w-full ${
                          errors.time ? "input-error" : ""
                        }`}
                      />
                    )}
                  />
                </label>
                {errors.time && (
                  <span className="text-error">{errors.time.message}</span>
                )}
              </div>
            </div>

            {/* Comprehensive Description */}
            <div className="md:flex mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Details about Camp</span>
                </label>
                <label className="input-group">
                  <Controller
                    name="description"
                    defaultValue={rowData?.description}
                    control={control}
                    rules={{ required: "Details about Camp is required" }}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        placeholder="Details about the Camp...."
                        className={`textarea w-full h-52 textarea-bordered textarea-lg ${
                          errors.description ? "textarea-error" : ""
                        }`}
                      ></textarea>
                    )}
                  />
                </label>
                {errors.description && (
                  <span className="text-error">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
            {/* image url */}
            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <label className="input-group">
                  <Controller
                    name="imageURL"
                    defaultValue={rowData?.imageURL}
                    control={control}
                    rules={{ required: "Image URL is required" }}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        placeholder="Photo URL"
                        className={`input input-bordered w-full ${
                          errors.imageURL ? "input-error" : ""
                        }`}
                      />
                    )}
                  />
                </label>
                {errors.imageURL && (
                  <span className="text-error">{errors.imageURL.message}</span>
                )}
              </div>
            </div>
            <button type="submit" className="w-full bg-rose text-white btn">
              Update Camp
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default UpdateModal;
