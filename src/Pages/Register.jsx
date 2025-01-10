import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import toast from "react-hot-toast";
import { useAuth } from "../Hooks/useAuth";
import { useAxiosPublic } from "../Hooks/useAxiosPublic";
import auth from "../Firebase/firebase.config";

export const Register = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const { authRegister, updateUser, setUser, user } = useAuth();
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  // password validation func:
  const validatePassword = (pass) => {
    const uppercase = /[A-Z]/.test(pass);
    const lowercase = /[a-z]/.test(pass);
    const minLength = pass.length >= 6;

    let err = "";
    if (!uppercase) {
      err = "Password must contain an uppercase letter.";
    }
    if (!lowercase) {
      err = "Password must contain a lowercase letter.";
    }
    if (!minLength) {
      err = "Password must be at least 6 characters long.";
    }

    setPasswordError(err);
    err = "";
  };
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidateCaptcha = () => {
    const user_typed_captcha = captchaRef.current.value;

    if (validateCaptcha(user_typed_captcha) == true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoUrl = form.photoUrl.value;
    const password = form.password.value;
    
    authRegister(email, password)
    .then(result =>{
      setUser(result.user);
      toast.success(`${name} successfully registered!`)
      updateUser(name, photoUrl);
       // Save user data to the database
    const response = axiosPublic.post("/createUser", {
      name: name,
      email:email,
      photoUrl: photoUrl,
    });
      navigate(location.state ? `${location.state}` : "/");
    }).catch(error =>{
      handleErrors(error);
    });
  };

  const handleErrors = (error) => {
    // Firebase-specific error handling
    if (error.code) {
      const errorMessages = {
        "auth/invalid-email": "The email address is not valid.",
        "auth/weak-password": "The password is too weak.",
        "auth/email-already-in-use": "The email is already registered.",
        "auth/operation-not-allowed":
          "Email/password accounts are not enabled.",
      };

      const message =
        errorMessages[error.code] || "An unexpected error occurred.";
      toast.error(message);
    } else {
      // Generic error handling
      console.error(error);
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className={`hero  bg-[url('./slide-5.jpg')] relative`}>
      <div className="absolute w-full h-full bg-[rgba(0,18,26,0.7)]"></div>
      <div className="hero-content flex-col lg:flex-row my-20">
        <div className="lg:w-1/2">
          <h1 className="text-4xl max-sm:text-center md:text-6xl font-extrabold font-nunito text-blue-50">
            Create an Account
          </h1>
          <p className="py-6 text-justify text-[rgba(239,246,255,0.9)] font-heebo">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="lg:w-1/2 card bg-blue-50 max-w-md shadow-2xl">
          <form className="card-body max-sm:p-4" onSubmit={handleRegister}>
            {/* user name */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text font-semibold text-[#34495E]">
                  Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full bg-white border-[#BCCCDC] focus:ring focus:ring-[#BCCCDC]"
                required
              />
            </div>

            {/* user photo url */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold text-[#34495E]">
                  Photo URL
                </span>
              </label>
              <input
                type="url"
                name="photoUrl"
                placeholder="Enter your photo URL"
                className="input input-bordered w-full bg-white border-[#BCCCDC] focus:ring focus:ring-[#BCCCDC]"
              />
            </div>
            {/* user email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Type email..."
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Type password..."
                onChange={(e) => validatePassword(e.target.value)}
                className="input input-bordered"
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2 whitespace-pre-line">
                  {passwordError}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                ref={captchaRef}
                name="captcha"
                placeholder="Type captcha..."
                className="input input-bordered"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleValidateCaptcha}
              className="btn btn-sm bg-[#001735] hover:bg-[#060f1b]  text-blue-100"
            >
              Validate
            </button>
            <div className="form-control mt-6">
              <button
                type="submit"
                disabled={disabled}
                className="btn bg-[#001735] hover:bg-[rgba(0,23,53,0.8)] text-[#efefef]"
              >
                Register
              </button>
            </div>
          </form>
          <div className="p-8 pt-0">
            <div className="divider mt-0 mb-5">OR</div>

            <p className="text-center mt-4 text-[#34495E]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#2C3E50] font-semibold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
