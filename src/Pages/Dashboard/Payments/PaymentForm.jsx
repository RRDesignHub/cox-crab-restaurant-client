import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { useCard } from "../../../Hooks/useCard";
import { useAuth } from "../../../Hooks/useAuth";

export const PaymentForm = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecrt] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [card] = useCard();
  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = card.reduce((total, item) => total + item?.price, 0);
  useEffect(() => {
    const handlePaymentSecret = async () => {
      const { data } =await axiosSecure.post("/create-payment-intent", {
        price: totalPrice,
      });
      setClientSecrt(data.clientSecret)
    };

    handlePaymentSecret();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setError(error.message);
      console.log("Payment error-->", error);
    } else {
      setError("");
      console.log("paymentMethod-->", paymentMethod);
    }

    // confirm payment:
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name:  user?.displayName || "anonymous",
          },
        },
      },
    ); 

    if(confirmError){
      console.log(confirmError)
    }else{
      setTransactionId("")
      console.log("paymentIntent-->", paymentIntent)
      setTransactionId(paymentIntent?.id)
    }

  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#001735",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p className="text-red-500 text-sm pt-3">{error}</p>
      <button
        className="btn bg-[#001735] mt-5 text-blue-50"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-[#001735]">Your transaction id: {transactionId}</p>
    </form>
  );
};
