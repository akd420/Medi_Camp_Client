/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Heading from "./Shared/Heading";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";

const ReviewModal = ({ rowData, open, setSelectedRowData, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowData("");
  };
  const handleAddReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const review = form.longDis.value;
    const reviewPhoto = form.photo.value || "";
    axiosSecure
      .put(`/registeredCamp/${rowData?.id}?email=${user?.email}`, {
        rating,
        review,
        reviewPhoto,
      })
      .then((res) => {
        console.log(res.data);
        refetch();
        closeModal();
        toast.success("Review Added Successfully");
      });
  };
  return (
    <div>
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
          <div>
            <div className="my-12">
              <Heading main={"Review"} sub={"Camp"}></Heading>
              <form onSubmit={handleAddReview} className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 mb-8">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Your Name</span>
                    </label>
                    <label className="input-group">
                      <input
                        type="text"
                        name="name"
                        value={user?.displayName}
                        placeholder="Your Name"
                        className="input input-bordered w-full"
                        readOnly
                        required
                      />
                    </label>
                  </div>
                  <div className="form-control md:ml-4">
                    <label className="label">
                      <span className="label-text">Rating</span>
                    </label>
                    <label className="input-group">
                      <select
                        name="rating"
                        className="select select-bordered w-full"
                        defaultValue=""
                        required
                      >
                        <option disabled value="">
                          Rating. . .
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="md:flex mb-8">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Your Review</span>
                    </label>
                    <label className="input-group">
                      <div className="form-control w-full">
                        <textarea
                          type="text"
                          name="longDis"
                          placeholder="Give your Review Here"
                          className="textarea w-full h-52 textarea-bordered textarea-lg"
                          required
                        ></textarea>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="mb-8">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Photo URL</span>
                    </label>
                    <label className="input-group">
                      <input
                        type="text"
                        name="photo"
                        placeholder="Photo URL"
                        className="input input-bordered w-full"
                      />
                    </label>
                  </div>
                </div>
                <button className="w-full bg-rose text-white btn">
                  Add Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ReviewModal;
