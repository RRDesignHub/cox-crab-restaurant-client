import { useNavigate, useParams } from "react-router-dom";
import { useAxiosPublic } from "../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { SectionHeader } from "../../Components/SectionHeader";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const image_api_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_api_key}`;
export const UpdateMenu = () => {
  const [menu, setMenu] = useState({});
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  useEffect(() => {
    const handleLoadMenu = async () => {
      const { data } = await axiosPublic.get(`/menu/${id}`);
      setMenu(data);
    };

    handleLoadMenu();
  }, []);

  const handleUpdateMenu = async(e) => {
    e.preventDefault();
    const form = e.target;
    
    const imageFile = form.imageFile.files[0]; 
    // Get form data
    const menuInfo = {
      name: form.name.value,
      additionalMeal: form.additionalMeal.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      isAvailable: form.isAvailable.value,
      description: form.description.value,
    };

    try {
      // Create a FormData object for the image
      const formData = new FormData();
      formData.append("image", imageFile);
      const { data } = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (data.success) {
        const imgUrl = data.data?.display_url;
        try {
          const { data } = await axiosSecure.put(`/menu/${menu._id}`, {
            ...menuInfo,
            imgUrl: imgUrl,
          });
          if(data.modifiedCount){
            toast.success(`${menuInfo.name} updated successfully`);
            navigate("/dashboard/manageMenu")
          }
        } catch (err) {
          toast.error(err.message);
          console.log("Menu info adding to database error-->", err);
        }
      }

    } catch (err) {
      console.log("Image uploading error -->", err);
    }
  };
  return (
    <>
      <div className="py-5 pe-5">
        <SectionHeader
          header={`Update: ${menu?.name}`}
          subHeader="Edit the input that you want to change..."
        ></SectionHeader>
        <div className="bg-blue-100 rounded-xl">
          <form
            onSubmit={handleUpdateMenu}
            className="p-12 grid grid-cols-1 md:grid-cols-2 items-center gap-x-4 gap-y-2"
          >
            {/* menu name */}
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Menu Name*</span>
              </label>
              <input
                type="text"
                defaultValue={menu?.name}
                placeholder="Type the menu name..."
                name="name"
                className="input input-bordered"
                required
              />
            </div>

            {/* additional meal */}
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Additional Meal</span>
              </label>
              <input
                type="text"
                defaultValue={menu?.additionalMeal}
                placeholder="Type the addtional meal..."
                name="additionalMeal"
                className="input input-bordered"
              />
            </div>

            {/* category */}
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              {menu?.category && (
                <select
                  defaultValue={menu?.category || ""}
                  name="category"
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Choose a category
                  </option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="snacks">Snacks</option>
                  <option value="dessert">Dessert</option>
                  <option value="dinner">Dinner</option>
                  <option value="beverages">Beverages</option>
                </select>
              )}
            </div>

            {/* price */}
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                defaultValue={menu?.price}
                placeholder="Price..."
                name="price"
                className="input input-bordered"
                required
              />
            </div>

            {/* is available */}
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Is Available*</span>
              </label>
              {menu?.isAvailable ? (
                <select
                  defaultValue={menu?.isAvailable}
                  name="isAvailable"
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Is avaiable
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              ) :
              <select
                  defaultValue=""
                  name="isAvailable"
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Is avaiable
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              
            }
            </div>

            {/* photo of the menu */}
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Menu Photo*</span>
              </label>
              <input
                type="file"
                name="imageFile"
                className="file-input w-full max-w-xs"
              />
            </div>

            {/* descriptions */}
            <div className="form-control col-span-2">
              <label className="label">
                <span className="label-text">About The Menu*</span>
              </label>
              <textarea
                name="description"
                defaultValue={menu?.description}
                placeholder="Descriptions"
                className="textarea textarea-bordered textarea-lg w-full"
              ></textarea>
            </div>

            <div className="form-control col-span-2 ms-auto">
              <button className="btn w-fit bg-[#001735] hover:bg-[#001735] text-blue-50 hover:text-blue-100">
                Update Menu
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
