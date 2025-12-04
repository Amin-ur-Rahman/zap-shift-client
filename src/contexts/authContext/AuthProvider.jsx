import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import auth from "../../../firebase.init";
import axiosInstance from "../AxiosInstance";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const cleanUp = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
      console.log(user);
    });
    return () => {
      cleanUp();
    };
  }, [user]);

  //   createAccount----------
  const createUser = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  };
  const signInUser = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  };

  const googleLogin = async () => {
    const res = await signInWithPopup(auth, provider);

    // console.log(res);
    const googleUser = res.user;
    const userData = {
      userName: googleUser.displayName,
      userEmail: googleUser.email,
      photoUrl: googleUser.photoURL,
    };
    const postResult = await axiosInstance.post("/users", userData);
    console.log(postResult);

    return res;
  };

  const handleUpdate = async (name, photoURL) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const contexts = {
    user,
    loading,
    createUser,
    googleLogin,
    handleUpdate,
    signInUser,
  };

  return (
    <AuthContext.Provider value={contexts}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
