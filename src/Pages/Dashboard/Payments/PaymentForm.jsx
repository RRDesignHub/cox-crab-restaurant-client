import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card,
    })

    if(error){
      console.log("Payment error-->", error);
    }else{
      console.log("[paymentMethod]", paymentMethod);
    }
  };
  return (
    <form onSubmit={handleSubmit} >
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
      />
      <button className="btn bg-[#001735] mt-5 text-blue-50" type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};
