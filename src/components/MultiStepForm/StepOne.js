// src/components/MultiStepForm/StepName.js

import React from "react";

const StepOne = ({ formData, handleChange, handleProfilePhotoChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 1: Name</h2>
      <input
        type="file"
        accept="image/*"
        value={formData.photo}
        onChange={(e) => handleProfilePhotoChange(e.target.files[0])}
        className="block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 mb-4"
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange("name")}
        placeholder="Enter your name"
        className="border border-gray-300 text-black rounded py-2 px-3 w-full mb-4"
      />
      <textarea
        value={formData.bio}
        name="bio"
        onChange={handleChange("bio")}
        placeholder="Write a short bio about yourself"
        className="border border-gray-300 text-black rounded py-2 px-3 w-full h-40 mb-4"
      />
      <input
        type="text"
        value={formData.location}
        name="location"
        onChange={handleChange("location")}
        placeholder="Enter your Location"
        className="border border-gray-300 text-black rounded py-2 px-3 w-full mb-4"
      />
    </div>
  );
};

export default StepOne;
