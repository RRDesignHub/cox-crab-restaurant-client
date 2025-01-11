import { loadStripe } from "@stripe/stripe-js";
import { SectionHeader } from "../../../Components/SectionHeader"
import { PaymentForm } from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
export const Payment = () => {
  return (
    <div className="py-5 pe-5" >
      <SectionHeader header="Checkout Payment" subHeader="Make payment hurry and get your best menu..."></SectionHeader>
      <div className="py-10 px-5 bg-blue-100 rounded-xl">
        <Elements stripe={stripePromise}>
          <PaymentForm></PaymentForm>
        </Elements>
      </div>
    </div>
  )
}
