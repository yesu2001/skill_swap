import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import MultiStepForm from "../components/MultiStepForm/MultiStepForm";
import SkillFormPopup from "../components/popups/SkillFormPopup";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { fetchUserDetails } from "../reducer/userDetailsSlice";
import {
  fetchUserSkills,
  addNewSkill,
  updateSkill,
  deleteSkill,
} from "../reducer/userSkillsSlice";

const UserProfile = ({ user, setShowModal, showModal }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = auth.currentUser;
  const currentUserId = currentUser.uid;

  const userDetails = useSelector((state) => state.userDetails.data);
  const userDetailsLoading = useSelector(
    (state) => state.userDetails.isLoading
  );
  const userDetailsError = useSelector((state) => state.userDetails.error);

  // Fetch user skills from Redux store
  const userSkills = useSelector((state) => state.userSkills.data);
  const userSkillsLoading = useSelector((state) => state.userSkills.isLoading);
  const userSkillsError = useSelector((state) => state.userSkills.error);

  console.log();
  useEffect(() => {
    // Fetch user details on component load
    dispatch(fetchUserDetails(currentUserId));
    dispatch(fetchUserSkills(currentUserId));
  }, [dispatch, currentUserId]);

  const handleSaveSkill = (newSkill) => {
    // Dispatch the addNewSkill action with the new skill data
    dispatch(addNewSkill({ userId: currentUserId, newSkill }));
  };

  const handleUpdateSkill = (updatedSkill) => {
    // Dispatch the updateSkill action with the updated skill data
    dispatch(updateSkill({ userId: currentUserId, updatedSkill }));
  };

  const handleDeleteSkill = (skillId) => {
    // Dispatch the deleteSkill action with the skill ID to delete
    dispatch(deleteSkill({ userId: currentUserId, skillId }));
  };

  const handleAddSkill = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* User details card */}
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
          <div className="flex items-center gap-4">
            <img
              src="path_to_user_photo.jpg"
              alt="User Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p>Name: {userDetails?.name}</p>
              <p>Email: {currentUser?.email}</p>
              {/* Add more user details as needed */}
            </div>
          </div>
        </div>

        {/* Skills listing */}
        <div className="mt-6 bg-primary p-6 rounded-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Skills Listing</h2>
            <button
              className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 mt-2"
              onClick={handleAddSkill}
            >
              Add New Skill
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {userSkills?.map((skill, index) => (
              <div
                key={index}
                className="bg-background p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold">{skill.skillName}</h3>
                <p>Proficiency: {skill.proficiency}</p>
                <p>Experience: {skill.experience} years</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal for adding new skill */}
      {isModalOpen && (
        <SkillFormPopup onClose={handleCloseModal} onSave={handleSaveSkill} />
      )}
      {showModal && <MultiStepForm setShowModal={setShowModal} />}
    </div>
  );
};

export default UserProfile;

// return (
//   <div>
//     <button onClick={() => setShowModal(true)}>Update Profile</button>
//     <h2>User Profile</h2>
//     <p>Name: {user.displayName ? user.displayName : "User"}</p>
//     <p>Email: {user.email}</p>
//     <p>Email Verified: {user.emailVerified ? "Yes" : "No"}</p>
//     {/* Display other profile information like bio, location, etc. */}
//     {showModal && (
//       <div className="modal active">
//         <MultiStepForm setShowModal={setShowModal} />
//       </div>
//     )}
//   </div>
// );
