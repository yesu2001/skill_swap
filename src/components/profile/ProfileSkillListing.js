import React from "react";

function ProfileSkillListing({ handleAddSkill, userSkills, handleEditSkill }) {
  return (
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
          <div key={index} className="bg-background p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">{skill.skillName}</h3>
              <button
                className="text-green-400 hover:text-opacity-80"
                onClick={() => handleEditSkill(skill.skill_id)} // Replace handleEditSkill with your edit function
              >
                Edit
              </button>
            </div>
            <p>Proficiency: {skill.proficiency}</p>
            <p>Experience: {skill.experience} years</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileSkillListing;
