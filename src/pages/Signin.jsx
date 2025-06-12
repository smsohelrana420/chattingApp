import React, { useState } from "react";
import { Link } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../sliece/userSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Signin = () => {
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setUserInfo((prev) => {
      return { ...prev, email: e.target.value };
    });
  };
  const handlePassword = (e) => {
    setUserInfo((prev) => {
      return { ...prev, password: e.target.value };
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (userInfo.email && userInfo.password) {
      signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          if (user.emailVerified) {
            dispatch(userLoginInfo(user)); //set data in redux
            // localStorage.setItem('login',JSON.stringify(user)) // setItem localStorage
            navigate("/");
          } else {
            toast.success("Please Verify Your Email ");
          }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;
          console.log(errorCode);
          if (errorCode.includes("auth/invalid-credential")) {
            toast.error("Invalid Email or Password");
            setUserInfo({
              email: " ",
              password: "",
            });
          }
        });
    } else {
      alert("Email & Password are Required");
    }
  };
  const handaleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(userLoginInfo(user));
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
      });
  };
  return (
    <div className="bg-gray-500">
      <Toaster />

      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <h1 className="text-center mb-4 text-4xl font-bold text-green-300">
            Chatting App
          </h1>

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-slate-900 text-center text-3xl font-semibold">
              Sign in
            </h2>
            <button
              onClick={handaleGoogleLogin}
              className="mt-8 bg-green-200 p-4 rounded-full font-bold text-xl cursor-pointer"
            >
              Sign In With Google
            </button>
            <form onSubmit={handleLogin} className="mt-12 space-y-6">
              <div>
                <label className="text-slate-800 text-xl font-medium mb-2 block">
                  Your Email
                </label>
                <div className="relative flex items-center">
                  <input
                    onChange={handleEmail}
                    name="username"
                    type="email"
                    required=""
                    className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter Your Email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle cx={10} cy={7} r={6} data-original="#000000" />
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-slate-800 text-xl font-medium mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    onChange={handlePassword}
                    name="password"
                    type="password"
                    required=""
                    className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-slate-800"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="jajvascript:void(0);"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                >
                  Sign in
                </button>
              </div>
              <p className="text-slate-800 text-sm !mt-6 text-center">
                Don't have an account?{" "}
                <Link
                  to={"/signup"}
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Sign Up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
