import React, { useState } from "react";
import { auth, provider } from "config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
//Styles
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import { setUser } from "store/slices/uiSlice";

export function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signIn = () => {
    setError("");
    try {
      signInWithPopup(auth, provider)
        .then((userDetails) => {
          // const credential =
          //   GoogleAuthProvider.credentialFromResult(userDetails);
          if (userDetails.user.uid == process.env.REACT_APP_FIREBASE_ADMIN_ID) {
            dispatch(setUser());
            navigate("/");
          } else {
            setError("User is not authorized!");
          }
        })
        .catch((err) => console.error(err));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.container}>
      {error ? <p>{error}</p> : undefined}
      <h2 style={{ margin: 0 }}>Welcome</h2>
      <h3>please login to expense tracker</h3>
      <button onClick={signIn}>
        <FcGoogle size='1.3rem' /> Sign In With Google
      </button>
    </div>
  );
}
