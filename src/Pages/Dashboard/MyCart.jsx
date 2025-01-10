import { useState } from "react";
import { useCard } from "../../Hooks/useCard";
import { MdDeleteForever } from "react-icons/md";
import { LoadingSpin } from "../../Components/LoadingSpin";
import toast from "react-hot-toast";
import axios from "axios";
export const MyCart = () => {
  const [card, refetch] = useCard();
  if(!card) {
    return <LoadingSpin></LoadingSpin>
  }

  const totalPrice = card.reduce((total, item) =>total + item.price, 0);


  // delete job from db and UI:
  const handleDeleteItem = async(id) =>{
    try{
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/cards/${id}`
      );
      if(data.deletedCount){
        toast.success("Dish successfully deleted!!!")
        refetch();
      }
    }catch(err){
      console.log(err.message)
    }
  }

  // confirm first if the dish want to delete or not:
  const handleDeleteConfirm = (id) =>{
    toast(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>Are you sure!!!</p>
          <div className="flex gap-2">
            <button 
            className="btn bg-red-400 text-white hover:bg-red-500"
            onClick={() => {
              handleDeleteItem(id)
              toast.dismiss(t.id)
            }}>Yes</button>
            <button 
            className="btn bg-green-400 text-white hover:bg-green-500"
            onClick={() => toast.dismiss(t.id)}>Cancel</button>
          </div>
        </div>  
      )
    );
  }
  return (
    <>
      <div className="py-5 md:py-10">
        <div className="max-sm:w-11/12 mx-auto flex flex-col max-sm:items-start gap-y-2 md:flex-row justify-evenly items-center ">
          <h3 className="text-xl font-semibold font-nunito text-[#001735]">
           Added Items: {card?.length}
          </h3>
          <h3 className="text-xl font-semibold font-nunito text-[#001735]">
            Total Price: ${parseInt(totalPrice)}
          </h3>
          <button className="btn bg-blue-200 text-[#001735]">PAY</button>
        </div>
        <div className="divider pe-4 my-0"></div>
        <div className="overflow-x-auto">
          {card?.length == 0 ? (
            <h2 className="text-center py-10 text-3xl font-bold font-nunito text-[rgba(0,23,53,0.51)]">
              You are not added to cart yet!!!
            </h2>
          ) : (
            <table className="table font-heebo">
              {/* head */}
              <thead>
                <tr>
                  <th>Sl.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {card?.map((item, index) => (
                  <tr key={item._id}>
                    <th className="font-normal">{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item?.dishImg}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        
                      </div>
                    </td>
                    <td className="font-semibold">
                    {item?.dishName}
                    </td>
                    <td>${item?.price}</td>
                    <th>
                      <button onClick={() => handleDeleteConfirm(item._id)} className="btn text-red-500 bg-transparent hover:bg-transparent border-none shadow-none btn-xs text-2xl">
                        <MdDeleteForever></MdDeleteForever>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
