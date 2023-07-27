// src/components/MultiStepForm/MultiStepForm.js

import React, { useEffect, useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { auth, db, storage } from "../../firebase/firebaseConfig";
import {
  addProfilePhoto,
  addUserDetails,
} from "../../reducer/userDetailsSlice";
import { useDispatch } from "react-redux";

const MultiStepForm = ({ setShowModal, userDetails }) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const currentUser = auth.currentUser;
  const {
    name,
    bio,
    location,
    skillsToLearn,
    skillsToOffer,
    receive_email_notifications,
    receive_push_notifications,
    reviews_received,
    ratings,
    groups,
  } = userDetails;
  const [formData, setFormData] = useState({
    photo: "",
    name: name || "",
    bio: bio || "",
    skillsToOffer: skillsToOffer || [],
    skillsToLearn: skillsToLearn || [],
    location: location || "",
    receive_email_notifications: receive_email_notifications || false,
    receive_push_notifications: receive_push_notifications || false,
    reviews_received: reviews_received || [],
    ratings: ratings || 0,
    groups: groups || [],
  });

  const handleChange = (field) => (e) => {
    const { value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProfilePhotoChange = async (file) => {
    console.log(file);
    try {
      const storageRef = ref(storage, `profilePhotos/${file.name}`);
      await uploadBytes(storageRef, file);
      // Get the download URL of the uploaded profile picture
      const downloadURL = await getDownloadURL(storageRef);
      setFormData((prevFormData) => ({
        ...prevFormData,
        photo: downloadURL,
      }));
      console.log("Profile photo uploaded successfully!");
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    }
  };

  const handleSkilloffer = (skillsToOffer) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      skillsToOffer,
    }));
  };

  const handleSkillLearn = (skillsToLearn) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      skillsToLearn,
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
      if (currentUser) {
        dispatch(addUserDetails({ userId: currentUser.uid, formData }));
        console.log("User data saved to Firestore.");
      }
    } catch (error) {
      console.error("Error saving form data:", error);
    }
    // Close the modal or redirect the user to the dashboard
  };

  return (
    <div className="bg-primary fixed inset-0 flex items-center justify-center">
      <div className="bg-background p-6 rounded-lg shadow-lg">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-foreground focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        {currentStep === 1 && (
          <StepOne
            formData={formData}
            handleChange={handleChange}
            handleProfilePhotoChange={handleProfilePhotoChange}
          />
        )}
        {currentStep === 2 && (
          <StepTwo
            formData={formData}
            handleChange={handleSkilloffer}
            onPrevious={handlePrevious}
          />
        )}
        {currentStep === 3 && (
          <StepThree
            formData={formData}
            handleChange={handleSkillLearn}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
          />
        )}
        <div className=" flex justify-between mt-4">
          <button
            disabled={currentStep === 1 ? true : false}
            className="ml-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none"
            onClick={handlePrevious}
            style={{ color: currentStep === 1 ? "grey" : "white" }}
          >
            Previous
          </button>
          {currentStep < 3 && (
            <button
              onClick={handleNext}
              className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none "
            >
              Next
            </button>
          )}
          {currentStep === 3 && (
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none"
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

// const [step, setStep] = useState(1);

// // State for user details
// const [name, setName] = useState("");
// const [description, setDescription] = useState("");
// const [location, setLocation] = useState("");
// const [profilePhoto, setProfilePhoto] = useState(null);

// // State for skills to offer
// const [skillsOffer, setSkillsOffer] = useState([]);
// const [skillOfferValue, setSkillOfferValue] = useState("");

// // State for skills to learn
// const [skillsLearn, setSkillsLearn] = useState([]);
// const [skillLearnValue, setSkillLearnValue] = useState("");

// const handleNext = () => {
//   setStep(step + 1);
// };

// const handlePrevious = () => {
//   setStep(step - 1);
// };

// const handleSubmit = () => {
//   // Implement your logic here to submit the form data to the backend or Firebase
//   // For simplicity, we'll just console log the form data
//   const formData = {
//     name,
//     description,
//     location,
//     profilePhoto,
//     skillsOffer,
//     skillsLearn,
//   };
//   console.log(formData);

//   // Close the modal after submitting the form
//   setShowModal(false);
// };

// const handleCloseModal = () => {
//   // Close the modal when the close button is clicked
//   setShowModal(false);
// };

// return (
//   <div className="bg-background fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
//     <div className="bg-primary p-4 rounded-lg shadow-md w-96 p-8">

//       {step === 1 && (
//         <>
//           {/* Step 1: User Details */}
//           <h2 className="text-2xl font-bold mb-4">Step 1: User Details</h2>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Name"
//             className="border border-gray-300 rounded py-2 px-3 mb-2 w-full"
//           />
//           <input
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Description"
//             className="border border-gray-300 rounded py-2 px-3 mb-2 w-full"
//           />
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             placeholder="Location"
//             className="border border-gray-300 rounded py-2 px-3 mb-2 w-full"
//           />
//           {/* Add input for uploading profile photo */}
//           <input
//             type="file"
//             onChange={(e) => setProfilePhoto(e.target.files[0])}
//             className="mb-4"
//           />
//         </>
//       )}

//       {step === 2 && (
//         <>
//           {/* Step 2: Skills to Offer */}
//           <h2 className="text-2xl font-bold mb-4">Step 2: Skills to Offer</h2>
//           <div className="flex items-center justify-between mb-2">
//             <input
//               type="text"
//               value={skillOfferValue}
//               onChange={(e) => setSkillOfferValue(e.target.value)}
//               placeholder="Enter a Skill to Offer"
//               className="border border-gray-300 rounded py-2 px-3 w-full"
//             />
//             <button
//               onClick={() => {
//                 if (skillOfferValue.trim() !== "") {
//                   setSkillsOffer([...skillsOffer, skillOfferValue]);
//                   setSkillOfferValue("");
//                 }
//               }}
//               className="ml-2 w-full bg-blue-500 text-white py-2 px-2 rounded"
//             >
//               Add skill
//             </button>
//           </div>
//           {skillsOffer.length > 0 && (
//             <div className="grid gap-2 grid-cols-4">
//               {skillsOffer.map((skill, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between px-3 py-2 bg-gray-200 rounded-md text-sm text-gray-800"
//                 >
//                   {skill}
//                   <span
//                     onClick={() =>
//                       setSkillsOffer((prevSkills) =>
//                         prevSkills.filter((_, i) => i !== index)
//                       )
//                     }
//                     className="ml-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center -mt-1 -mr-1"
//                   >
//                     x
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       {step === 3 && (
//         <>
//           {/* Step 3: Skills to Learn */}
//           <h2 className="text-2xl font-bold mb-4">Step 3: Skills to Learn</h2>
//           <div className="flex items-center justify-between mb-2">
//             <input
//               type="text"
//               value={skillLearnValue}
//               onChange={(e) => setSkillLearnValue(e.target.value)}
//               placeholder="Enter a Skill to Learn"
//               className="border border-gray-300 rounded py-2 px-3 w-full"
//             />
//             <button
//               onClick={() => {
//                 if (skillLearnValue.trim() !== "") {
//                   setSkillsLearn([...skillsLearn, skillLearnValue]);
//                   setSkillLearnValue("");
//                 }
//               }}
//               className="ml-2 w-full bg-blue-500 text-white py-2 px-2 rounded"
//             >
//               Add skill
//             </button>
//           </div>
//           {skillsLearn.length > 0 && (
//             <div className="grid gap-2 grid-cols-4">
//               {skillsLearn.map((skill, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between px-3 py-2 bg-gray-200 rounded-md text-sm text-gray-800"
//                 >
//                   {skill}
//                   <span
//                     onClick={() =>
//                       setSkillsLearn((prevSkills) =>
//                         prevSkills.filter((_, i) => i !== index)
//                       )
//                     }
//                     className="ml-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center -mt-1 -mr-1"
//                   >
//                     x
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       <div className="mt-6 flex justify-between">
//         {/* Previous Button */}
//         {step > 1 && (
//           <button
//             onClick={handlePrevious}
//             className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Previous
//           </button>
//         )}

//         {/* Next or Submit Button */}
//         {step < 3 ? (
//           <button
//             onClick={handleNext}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Next
//           </button>
//         ) : (
//           <button
//             onClick={handleSubmit}
//             className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500"
//           >
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   </div>
// );
