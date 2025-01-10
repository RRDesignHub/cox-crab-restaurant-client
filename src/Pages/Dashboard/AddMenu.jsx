import toast from "react-hot-toast";
import { SectionHeader } from "../../Components/SectionHeader";
import { useAxiosPublic } from "../../Hooks/useAxiosPublic";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";

const axiosPublic = useAxiosPublic();
const image_api_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_api_key}`;
export const AddMenu = () => {
  
const axiosSecure = useAxiosSecure();
  const handleAddMenu = async (e) => {
    e.preventDefault();

    const form = e.target;
    const imageFile = form.imageFile.files[0]; 
    // Get form data
    const menuInfo = {
      name: form.name.value,
      additionalMeal: form.additionalMeal.value,
      category: form.category.value,
      price: parseInt(form.price.value),
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
          const { data } = await axiosSecure.post("/menu", {
            ...menuInfo,
            imgUrl: imgUrl,
          });
          if(data.insertedId){
            toast.success(`${menuInfo.name} added successfully`);
            form.reset();
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
      <div className="py-3 pe-5">
        <SectionHeader
          header="Add A Menu"
          subHeader="What's new?"
        ></SectionHeader>
        <div className="bg-blue-100 rounded-xl">
          <form
            onSubmit={handleAddMenu}
            className="p-12 grid grid-cols-1 md:grid-cols-2 items-center gap-x-4 gap-y-2"
          >
            {/* menu name */}
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Menu Name*</span>
              </label>
              <input
                type="text"
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
              <select
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
                <option value="beverages">Baverages</option>
              </select>
            </div>

            {/* price */}
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
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
              <select
                defaultValue="Is avaiable"
                name="isAvailable"
                className="select select-bordered w-full"
              >
                <option disabled value="">
                  Is avaiable
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* photo of the menu */}
            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Menu Photo*</span>
              </label>
              <input type="file" name="imageFile" className="file-input w-full max-w-xs" />
            </div>


            {/* descriptions */}
            <div className="form-control col-span-2">
              <label className="label">
                <span className="label-text">About The Menu*</span>
              </label>
              <textarea
                name="description"
                placeholder="Descriptions"
                className="textarea textarea-bordered textarea-lg w-full"
              ></textarea>
            </div>

            <div className="form-control col-span-2 ms-auto">
              <button className="btn w-fit bg-[#001735] hover:bg-[#001735] text-blue-50 hover:text-blue-100">
                Add Menu
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
