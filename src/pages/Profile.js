import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import MultiStepForm from "../components/MultiStepForm/MultiStepForm";
import SkillFormPopup from "../components/popups/SkillFormPopup";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { fetchUserDetails } from "../reducer/userDetailsSlice";
import { fetchAllSkills } from "../reducer/AllskillsSlice";

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
import ProfileRequestSkills from "../components/profile/RequestedSkills";
import generateCustomID from "../helper/generateCustomId";

const UserProfile = ({ user, setShowModal, showModal }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = auth.currentUser;
  const currentUserId = currentUser?.uid;
  const [skillId, setSkillId] = useState("");

  const userDetails = useSelector((state) => state.userDetails.data);
  const userSkills = useSelector((state) => state.userSkills.data);
  const allSkills = useSelector((state) => state.allSkills.data);
  const [isEdit, setIsEdit] = useState(false);
  const filteresSkill = userSkills.filter(
    (skill) => skill.skill_id === skillId
  );
  const userOwnSkill = allSkills?.map((skill) =>
    skill.skill_listings.filter(
      (skillItem) => skillItem.user_id !== currentUser?.uid
    )
  );
  const skillsRequestedByCurrentUser = userOwnSkill.map((skillItem) =>
    skillItem.filter((skill) =>
      skill.members_requested.some((member) => member.userId === currentUserId)
    )
  );

  // console.log(skillsRequestedByCurrentUser);

  useEffect(() => {
    dispatch(fetchUserDetails(currentUserId));
    dispatch(fetchUserSkills(currentUserId));
    dispatch(fetchAllSkills());
  }, [dispatch, currentUserId, userDetails, allSkills]);

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
        <ProfileDetails userDetails={userDetails} setShowModal={setShowModal} />
        <ProfileRequestSkills
          skillsRequestedByCurrentUser={skillsRequestedByCurrentUser}
        />
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
