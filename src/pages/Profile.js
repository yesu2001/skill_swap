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
import ProfileDetails from "../components/profile/ProfileDetails";
import ProfileSkillListing from "../components/profile/ProfileSkillListing";

const UserProfile = ({ user, setShowModal, showModal }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = auth.currentUser;
  const currentUserId = currentUser?.uid;

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
  }, [dispatch, currentUserId, userDetails]);

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

  // console.log(userDetails);

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* User details card */}
        <ProfileDetails userDetails={userDetails} setShowModal={setShowModal} />

        {/* Skills listing */}
        <ProfileSkillListing
          handleAddSkill={handleAddSkill}
          userSkills={userSkills}
        />
      </div>
      {/* Modal for adding new skill */}
      {isModalOpen && (
        <SkillFormPopup onClose={handleCloseModal} onSave={handleSaveSkill} />
      )}
      {showModal && (
        <MultiStepForm setShowModal={setShowModal} userDetails={userDetails} />
      )}
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
