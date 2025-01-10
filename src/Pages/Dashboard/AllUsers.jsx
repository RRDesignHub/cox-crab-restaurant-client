import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";

export const AllUsers = () => {
  const axiosSequre = useAxiosSecure();
  const { data = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSequre.get("/users");
      return data;
    },
  });

  // change user role:
  const handleChangeUserRole = async (id) => {
    try {
      const { data } = await axiosSequre.patch(`/users/role/${id}`);
      if (data.modifiedCount) {
        toast.success("Successfully changed the role to Admin!!!");
        refetch();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // delete user from db and UI:
  const handleDeleteUser = async (id) => {
    try {
      const { data } = await axiosSequre.delete(`/users/${id}`);
      if (data.deletedCount) {
        toast.success("User successfully deleted!!!");
        refetch();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // confirm first if the user role want to change or not:
  const handleChangeConfirm = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3 items-center">
        <p className="text-lg text-[rgba(0,23,53,0.7)]">
          Are you want to change the user role!!!
        </p>
        <div className="flex gap-2">
          <button
            className="btn bg-red-400 text-white hover:bg-red-500"
            onClick={() => {
              handleChangeUserRole(id);
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

  // confirm first if the user want to delete or not:
  const handleDeleteConfirm = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3 items-center">
        <p className="text-lg text-[rgba(0,23,53,0.7)]">
          Are you want to delete the user!!!
        </p>
        <div className="flex gap-2">
          <button
            className="btn bg-red-400 text-white hover:bg-red-500"
            onClick={() => {
              handleDeleteUser(id);
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
      <div className="py-10 pe-6">
        <div className="flex items-center justify-evenly">
          <h2 className="text-3xl font-nunito font-bold text-[#001735]">
            Total Users: {data?.length}
          </h2>
        </div>
        <div className="divider mt-0"></div>
        <div>
          <table className="table font-heebo">
            {/* head */}
            <thead>
              <tr>
                <th>Sl.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((user, index) => (
                <tr key={user?._id}>
                  <th className="font-normal">{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 rounded-full border-[2px] border-blue-100">
                          <img
                            src={user?.photoUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>
                    {user?.role == "Admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleChangeConfirm(user._id)}
                        className="btn bg-blue-100 hover:bg-blue-200 text-[#001735] text-xl"
                      >
                        <FaUser></FaUser>
                      </button>
                    )}
                  </td>
                  <th>
                    <button
                      onClick={() => handleDeleteConfirm(user._id)}
                      className="btn text-red-500 bg-transparent hover:bg-transparent border-none shadow-none btn-xs text-2xl"
                    >
                      <MdDeleteForever></MdDeleteForever>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
