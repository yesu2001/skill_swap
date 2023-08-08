import React from "react";
import defaultPic from "../../assets/default_pic.jpg";

function ProfileDetails({ setShowModal, userDetails }) {
  return (
    <div className="bg-primary p-6 rounded-lg shadow-md flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Basic User Details</h2>
        <button
          className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setShowModal(true)}
        >
          Update Profile
        </button>
      </div>
      <div className="flex items-center gap-8">
        <img
          src={userDetails?.photo || defaultPic}
          alt={userDetails?.photo}
          className="w-36 h-36 rounded-full"
        />
        <div>
          <p className="mb-1">Name: {userDetails?.name}</p>
          <p className="mb-1">Description: {userDetails?.bio}</p>
          <p className="mb-1">Location: {userDetails?.location}</p>
          {/* Add more user details as needed */}
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
