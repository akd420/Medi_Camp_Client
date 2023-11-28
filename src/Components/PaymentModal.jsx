/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Heading from "./Shared/Heading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const PaymentModal = ({ rowData, open, setSelectedRowData, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowData("");
  };
  const stripePromise = loadStripe(
    import.meta.env.VITE_PAYMENT_PUBLISHABLE_KEY
  );
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
              <Heading main={"Pay"} sub={"Here"}></Heading>
            </div>
            <Elements stripe={stripePromise}>
                <CheckOutForm rowData={rowData} refetch={refetch}></CheckOutForm>
            </Elements>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PaymentModal;
