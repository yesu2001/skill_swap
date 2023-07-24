// src/components/MultiStepForm/StepName.js

import React from "react";

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
//   }

const StepOne = ({ formData, handleChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 1: Name</h2>
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
