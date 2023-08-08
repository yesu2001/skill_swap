import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSkills } from "../../reducer/AllskillsSlice";
import { Link } from "react-router-dom";
import Skill from "./Skill";
import { auth } from "../../firebase/firebaseConfig";

function SkillCategories() {
  const dispatch = useDispatch();
  const allSkills = useSelector((state) => state.allSkills.data);
  // const currentUser = useSelector((state) => state.auth.user);
  const currentUser = auth.currentUser;

  useEffect(() => {
    dispatch(fetchAllSkills());
  }, [dispatch, allSkills]);

  const filteredSkills = allSkills?.map((skill) =>
    skill.skill_listings.filter(
      (skillItem) => skillItem.user_id !== currentUser?.uid
    )
  );

  // const filteredSkills = allSkills.map((skill) =>
  //   skill.skill_listings.filter((skillItem) =>
  //     userDetails?.skillsToLearn.includes(skillItem.skillName.toLowerCase())
  //   )
  // );

  // const allSkillsCategories = allSkills
  //   .map((skill) => skill.skill_listings.map((skillItem) => skillItem))
  //   .flat(1);

  // console.log(filteredSkills);

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">Recommended Skill Offers </h2>
        <Link to="/all_skills" className="text-blue-500 hover:underline">
          <h2 className="text mb-4">Show more</h2>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredSkills
          .slice(0, 3)
          .map((skillItem) =>
            skillItem.map((skill, index) => <Skill skill={skill} key={index} />)
          )}
      </div>
    </section>
  );
}

export default SkillCategories;
