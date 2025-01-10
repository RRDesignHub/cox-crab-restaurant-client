import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import { useAxiosPublic } from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
export const AuthProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);

  // user registration:
  const authRegister = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user's data:
  const updateUser = async (name, photoURL) => {
    setLoader(true);
    const currentUser = auth.currentUser;
    if (currentUser) {
      return updateProfile(currentUser, { displayName: name, photoURL })
        .then(() => {
          setUser({
            ...currentUser,
            displayName: name,
            photoURL: photoURL,
          });
        })
        .finally(() => setLoader(false));
    }
    setLoader(false);
  };

  // login user with email & password:
  const loginWithEmail = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const loginWithGoogle = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logoutUser = () => {
    setLoader(true);
    return signOut(auth);
  };

  // auth change
  useEffect(() => {
    const currentSubscriber = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log(`User--->`, currentUser);
      if (currentUser) {
        const userEmail = { email: currentUser?.email };

       
        // get jwt token from server side and set it to localstorage:
        const { data } = await axiosPublic.post("/jwt", userEmail);
        if (data?.token) {
          localStorage.setItem("access-token", data?.token);
        }
      } else {
        // remove token from localstorage
        localStorage.removeItem("access-token");
      }
      setLoader(false);
    });
    return () => {
      currentSubscriber();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    setUser,
    loader,
    setLoader,
    authRegister,
    loginWithEmail,
    loginWithGoogle,
    logoutUser,
    updateUser,
  };

  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};
