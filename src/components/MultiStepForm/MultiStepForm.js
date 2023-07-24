// src/components/MultiStepForm/MultiStepForm.js

import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { auth, db } from "../../firebase/firebaseConfig";

// "id": "user_id_123",
//   "name": "John Doe",
//   "email": "john@example.com",
//   "password": "hashed_password_here",
//   "location": "New York, USA",
//   "bio": "I'm a software developer with a passion for web development.",
//   "profile_picture": "https://example.com/profile/john_doe.jpg",
//   "skills": ["web_dev", "data_science"],
//   "preferences": {
//     "receive_email_notifications": true,
//     "receive_push_notifications": false
//   },
//   "reviews_received": ["review_id_1", "review_id_2"],
//   "ratings": {
//     "average_rating": 4.5,
//     "total_ratings": 10
const MultiStepForm = ({ setShowModal }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    bio: "",
    skills: [],
    location: "",
    receive_email_notifications: false,
    receive_push_notifications: false,
    reviews_received: [],
    ratings: {
      average_rating: 0,
      total_ratings: 10,
    },
    groups: [],
  });
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (field) => (e) => {
    const { value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSkillChange = (skills) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      setShowModal(false);
      const currentUser = auth.currentUser;
      // console.log(currentUser);
      if (currentUser) {
        const res = await setDoc(doc(db, "user_profiles", currentUser.uid), {
          ...formData,
          id: currentUser.uid,
        });

        console.log("User data saved to Firestore.", res);
      }
    } catch (error) {
      console.error("Error saving form data:", error);
    }
    // Close the modal or redirect the user to the dashboard
  };

  return (
    <div className="bg-primary fixed inset-0 flex items-center justify-center">
      <div className="bg-background p-6 rounded-lg shadow-lg">
        {currentStep === 1 && (
          <StepOne formData={formData} handleChange={handleChange} />
        )}
        {currentStep === 2 && (
          <StepTwo
            formData={formData}
            handleChange={handleSkillChange}
            onPrevious={handlePrevious}
          />
        )}
        {currentStep === 3 && (
          <StepThree
            formData={formData}
            handleChange={handleChange}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
          />
        )}
        <div className=" flex justify-between mt-4">
          <button
            onClick={() => setShowModal(false)}
            className="ml-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          {currentStep > 1 && (
            <button onClick={handlePrevious}>Previous</button>
          )}
          {currentStep < 3 && (
            <button
              onClick={handleNext}
              className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
            >
              Next
            </button>
          )}
          {currentStep === 3 && (
            <button
              onClick={handleSubmit}
              className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
