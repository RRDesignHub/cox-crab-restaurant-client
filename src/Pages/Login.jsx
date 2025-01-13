import { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useCard } from "../Hooks/useCard";
import { useAxiosPublic } from "../Hooks/useAxiosPublic";
export const Login = () => {
  const axiosPublic = useAxiosPublic();
  const [,refetch] = useCard();
  const location = useLocation();
  const navigate = useNavigate();
  const { loginWithEmail, loginWithGoogle, setUser, user} =useAuth();
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);


  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginWithEmail(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success(`User successfully log in!!!`)
        refetch();
        navigate(location.state?.from?.pathname || "/");
        form.reset();
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          toast.error("The email address you entered is not valid.");
        } else if (err.code === "auth/wrong-password") {
          toast.error("The password you entered is incorrect.")
        } else if (err.code === "auth/user-not-found") {
          toast.error('No account exists with the provided email.')
        } else {
          toast.error("An unexpected error occurred.");
        }
      });
  };

  const handleGoogleLogin = async () => {
    try {
      // Log in with Google
      const result = await loginWithGoogle();
  
      // Update the user state
      setUser(result.user);
      navigate(location.state ? `${location.state}` : "/");
      // Optionally refetch data
      refetch();
  
      // Extract user information
      const userData = {
        name: result.user?.displayName,
        email: result.user?.email,
        photoUrl: result.user?.photoURL,
      };
  
      // Save user data to the database
      const response = await axiosPublic.post("/createUser", {
        name: result.user?.displayName,
        email: result.user?.email,
        photoUrl: result.user?.photoURL,
      });
  
      if (response.data.insertedId) {
        
        console.log("User successfully added to database.");
      } else {
        console.log("User already exists!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleValidateCaptcha = () => {
    const user_typed_captcha = captchaRef.current.value;

    if (validateCaptcha(user_typed_captcha) == true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  return (
    <>
    
      <div className={`hero  bg-[url('./slide-5.jpg')] relative`}>
        <div className="absolute w-full h-full bg-[rgba(0,18,26,0.7)]"></div>
        <div className="hero-content flex-col lg:flex-row my-20">
          <div className="lg:w-1/2">
            <h1 className="text-4xl max-sm:text-center md:text-6xl font-extrabold font-nunito text-blue-50">
              Login now!
            </h1>
            <p className="py-3 md:py-6 text-[rgba(239,246,255,0.9)] text-justify font-heebo">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="w-full lg:w-1/2 card bg-blue-50 max-w-md shrink-0 shadow-2xl">
            <form className="card-body max-sm:p-4" onSubmit={handleLogin}>
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
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
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
                  Login
                </button>
              </div>
            </form>
            <div className="p-8 pt-0">
              <div className="divider mt-0 mb-5">OR</div>
              <button
                onClick={handleGoogleLogin}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <FcGoogle className="text-2xl" /> Continue with Google
              </button>
              <p className="text-center text-[#34495E] ">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#2C3E50] font-semibold hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
