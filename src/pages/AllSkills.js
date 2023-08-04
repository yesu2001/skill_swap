import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSkills } from "../reducer/AllskillsSlice";
import Skill from "../components/home/Skill";
import { auth } from "../firebase/firebaseConfig";

function AllSkills() {
  const dispatch = useDispatch();

  const allSkills = useSelector((state) => state.allSkills.data);
  const currentUser = auth.currentUser;

  useEffect(() => {
    dispatch(fetchAllSkills());
  }, [dispatch]);

  const filteredSkills = allSkills?.map((skill) =>
    skill.skill_listings.filter(
      (skillItem) => skillItem.user_id !== currentUser.uid
    )
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">All Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredSkills.map((skillItem) =>
            skillItem.map((skill, index) => <Skill skill={skill} key={index} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default AllSkills;
