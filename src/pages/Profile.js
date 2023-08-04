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
import ProfileGroups from "../components/profile/ProfileGroups";
import ProfileNotifies from "../components/profile/ProfileNotifies";
import generateCustomID from "../helper/generateCustomId";

const UserProfile = ({ user, setShowModal, showModal }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = auth.currentUser;
  const currentUserId = currentUser?.uid;
  const [skillId, setSkillId] = useState("");

  const userDetails = useSelector((state) => state.userDetails.data);
  const userSkills = useSelector((state) => state.userSkills.data);

  const [isEdit, setIsEdit] = useState(false);
  const filteresSkill = userSkills.filter(
    (skill) => skill.skill_id === skillId
  );
  console.log();
  useEffect(() => {
    dispatch(fetchUserDetails(currentUserId));
    dispatch(fetchUserSkills(currentUserId));
  }, [dispatch, currentUserId, userDetails]);

  const handleSaveSkill = (newSkill) => {
    const uid = generateCustomID();
    const skillData = {
      ...newSkill,
      skill_id: uid,
      rating: 0,
      reiews: [],
      user_id: currentUserId,
      user_name: userDetails.name,
      members_requested: [],
    };
    dispatch(addNewSkill({ userId: currentUserId, newSkill: skillData }));
  };

  const handleUpdateSkill = (skill) => {
    dispatch(updateSkill({ userId: currentUserId, skillId, skill }));
  };

  const handleEditSkill = (skillId) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setSkillId(skillId);
    // console.log(updatedSkill);
    // Dispatch the updateSkill action with the updated skill data
  };

  const handleDeleteSkill = (skillId) => {
    dispatch(deleteSkill({ userId: currentUserId, skillId }));
  };

  const handleAddSkill = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEdit(false);
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  // console.log(userDetails);

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <ProfileNotifies />
        <ProfileDetails userDetails={userDetails} setShowModal={setShowModal} />
        <ProfileSkillListing
          handleAddSkill={handleAddSkill}
          userSkills={userSkills}
          handleEditSkill={handleEditSkill}
        />
        <ProfileGroups />
      </div>
      {isModalOpen && (
        <SkillFormPopup
          onClose={handleCloseModal}
          onSave={handleSaveSkill}
          onUpdate={handleUpdateSkill}
          isEdit={isEdit}
          skill={filteresSkill}
        />
      )}
      {showModal && (
        <MultiStepForm setShowModal={setShowModal} userDetails={userDetails} />
      )}
    </div>
  );
};

export default UserProfile;
