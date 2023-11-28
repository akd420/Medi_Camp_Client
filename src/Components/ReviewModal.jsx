/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Heading from "./Shared/Heading";

const ReviewModal = ({rowData, open, setSelectedRowData, refetch}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowData("");
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
              <h1>Camp named: {rowData?.campName}</h1>
            </div>
          
          </div>
        </div>
      </dialog>
        </div>
    );
};

export default ReviewModal;