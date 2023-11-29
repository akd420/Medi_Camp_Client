/* eslint-disable react/prop-types */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/FirebaseConfig";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../Hooks/useAxios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  //google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //register user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //sign out
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const {
    data: camps,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const response = await axios.get(
        `${baseUrl}/camps?email=${user?.email}`,
        { withCredentials: true }
      );
      return response.data;
    },
  });

  const {
    data: upCamps,
    isLoading: upLoading,
    refetch: upFetch,
  } = useQuery({
    queryKey: ["upCamps"],
    queryFn: async () => {
      const response = await axios.get(
        `${baseUrl}/upcomingCamps?email=${user?.email}`,
        { withCredentials: true }
      );
      return response.data;
    },
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      if (user) {
        axios.get(`${baseUrl}/users?email=${user?.email}`).then((res) => {
          setUserData(res.data);
        });
      }
      setLoading(false);
      if (currentUser) {
        axios
          .post(`${baseUrl}/jwt`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("token response", res.data);
          });
      } else {
        axios
          .post(`${baseUrl}/logout`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("logout response", res.data);
          });
      }
    });
  }, [user]);
  const authenticate = {
    user,
    googleLogin,
    createUser,
    signInUser,
    signOutUser,
    loading,
    userData,
    camps,
    isLoading,
    refetch,
    upCamps,
    upLoading,
    upFetch,
  };

  return (
    <AuthContext.Provider value={authenticate}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
