/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useToast from "./Shared/useToast";

const DeleteModal = ({ open, rowId, setSelectedRowId }) => {
  const { refetch } = useAuth();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowId(""); // Reset selected row data
  };
  return (
    <div>
      <dialog
        id="my_modal_2"
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
          <h1>test {rowId}</h1>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteModal;
