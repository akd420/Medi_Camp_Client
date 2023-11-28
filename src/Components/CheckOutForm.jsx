/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CustomButton from "./Shared/CustomButton";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { axiosSecure } from "../Hooks/useAxios";
import toast from "react-hot-toast";

const CheckOutForm = ({ rowData, refetch , closeModal}) => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: rowData?.fees })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [rowData?.fees]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm card payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      setError(confirmError.message);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log(paymentIntent.id);
        toast.success(
          `Payment Successful. Transaction ID: ${paymentIntent.id}`
        );
        axiosSecure
          .put(`/registeredCamp/${rowData?.id}`, {
            payment: "Paid",
            txId: paymentIntent.id,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              refetch();
              closeModal()
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        ></CardElement>
        {/* <button
          className="btn bg-rose mt-4"
          type="submit"
          disabled={!stripe}
          onClick={handleSubmit}
        >
          Pay
        </button> */}
        <p className="text-red-600 text-center mt-4">{error}</p>

        <div className="text-center my-8">
          <button
            className="btn text-white bg-rose"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            {loading ? "Processing..." : `PAY $${rowData?.fees}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;
