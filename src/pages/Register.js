import React, { useState } from "react";
import RegisterComponent from "../components/auth/Register";
import { Navigate } from "react-router";
import MultiStepForm from "../components/MultiStepForm/MultiStepForm";

function Register({ isAuthenticated, showModal, setShowModal }) {
  if (isAuthenticated()) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className="min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary">
            Registration Form
          </h2>
        </div>
        <RegisterComponent setShowModal={setShowModal} />
      </div>
    </div>
  );
}

export default Register;
