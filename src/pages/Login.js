import React from "react";
import LoginComponent from "../components/auth/Login";
import { Navigate } from "react-router";

function Login({ isAuthenticated }) {
  if (isAuthenticated()) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className="flex justify-center items-center h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary">
            Login to Your Account
          </h2>
        </div>
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;
