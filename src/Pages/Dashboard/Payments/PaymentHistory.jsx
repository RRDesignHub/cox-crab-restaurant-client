import { useEffect, useState } from "react";
import { SectionHeader } from "../../../Components/SectionHeader";
import { useAuth } from "../../../Hooks/useAuth";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import moment from 'moment';
export const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [paymentsHistory, setPaymentsHistory] = useState([]);
  useEffect(() => {
    const handlePaymentSHistory = async () => {
      const { data } = await axiosSecure.get(`/payments/${user?.email}`);
      setPaymentsHistory(data);
    };

    handlePaymentSHistory();
  }, []);
  return (
    <div className="py-5 pe-5">
      <SectionHeader header="Payments History" subHeader=""></SectionHeader>
      <div className="bg-blue-50 rounded-xl py-4">
        <div className="overflow-x-auto">
          {paymentsHistory?.length == 0 ? (
            <h2 className="text-center py-10 text-3xl font-bold font-nunito text-[rgba(0,23,53,0.51)]">
              There are no transactions occured yet!!!
            </h2>
          ) : (
            <table className="table font-heebo">
              {/* head */}
              <thead>
                <tr>
                  <th>Sl.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Transaction Id</th>
                  <th className="text-center">Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentsHistory?.map((payment, index) => (
                  <tr key={payment._id}>
                    <th className="font-normal">{index + 1}</th>
                    <td className="font-semibold">
                    {payment?.userName}
                    </td>
                    <td className="font-semibold">{payment?.userEmail}</td>
                    <td className="text-right">${payment?.price}</td>
                    <td>{payment?.transactionId}</td>
                    <td>{moment(payment?.date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                    <td className="text-blue-600">{payment?.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
