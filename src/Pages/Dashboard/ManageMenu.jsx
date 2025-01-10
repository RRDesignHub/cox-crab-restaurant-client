import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { useMenu } from "../../Hooks/useMenu";
import { SectionHeader } from "../../Components/SectionHeader";
import { Link } from "react-router-dom";

export const ManageMenu = () => {
  const [menu, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  // delete user from db and UI:
  const handleDeleteMenu = async (id) => {
    try {
      const { data } = await axiosSecure.delete(`/menu/${id}`);
      if (data.deletedCount) {
        toast.success("Menu successfully deleted!!!");
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  // confirm first if the user want to delete or not:
  const handleDeleteConfirm = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3 items-center">
        <p className="text-lg text-[rgba(0,23,53,0.7)]">
          Are you want to delete the menu!!!
        </p>
        <div className="flex gap-2">
          <button
            className="btn bg-red-400 text-white hover:bg-red-500"
            onClick={() => {
              handleDeleteMenu(id);
              toast.dismiss(t.id);
            }}
          >
            Yes
          </button>
          <button
            className="btn bg-blue-100 text-[#001735] hover:bg-blue-200"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };
  return (
    <>
      <div className="py-5 pe-6">
        <div>
          <SectionHeader
            header="Manage All Menu"
            subHeader="Change, update or delete specific menu..."
          ></SectionHeader>
        </div>
        <div className="flex items-center justify-evenly">
          <h2 className="text-lg font-heebo font-bold text-[#001735]">
            Total Menu: {menu?.length}
          </h2>
        </div>
        <div>
          <table className="table font-heebo w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Sl.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th className="text-center">Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {menu?.map((item, index) => (
                <tr key={item?._id}>
                  <th className="font-normal">{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-14 w-14 rounded-full ">
                          <img
                            src={item?.imgUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">{item?.name}</td>
                  <td className="font-semibold">{item?.category}</td>
                  <td className="text-right">$ {item?.price}</td>
                  <td className="h-[73px] flex justify-center items-center gap-4">
                    <Link to={`/dashboard/updateMenu/${item._id}`}>
                      <button className="btn bg-transparent hover:bg-transparent border-none shadow-none btn-xs text-xl text-[#001735]">
                        <FaEdit></FaEdit>
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteConfirm(item._id)}
                      className="btn text-red-500 bg-transparent hover:bg-transparent border-none shadow-none btn-xs text-2xl"
                    >
                      <MdDeleteForever></MdDeleteForever>
                    </button>
                  </td>
                  <th></th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
