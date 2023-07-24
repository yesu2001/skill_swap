// src/components/MultiStepForm/StepBio.js
import React, { useState, useEffect } from "react";

const StepTwo = ({ formData, handleChange }) => {
  const initialSkillList = Array.isArray(formData.skills)
    ? [...formData.skills]
    : [];
  const [skillList, setSkillList] = useState(initialSkillList);
  const [skillValue, setSkillValue] = useState("");

  useEffect(() => {
    handleChange(skillList);
  }, [skillList, handleChange]);

  const handleAddSkill = () => {
    if (skillValue.trim() !== "") {
      setSkillList((prevSkillList) => [...prevSkillList, skillValue]);
      setSkillValue(""); // Clear the input field after adding the skill
    }
    console.log(skillList);
  };

  const handleRemoveSkill = (index) => {
    setSkillList((prevSkillList) => {
      const updatedSkillList = [...prevSkillList];
      updatedSkillList.splice(index, 1);
      return updatedSkillList;
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 2: Skills</h2>
      <div className="flex items-center justify-between mb-2">
        <input
          type="text"
          value={skillValue}
          onChange={(e) => setSkillValue(e.target.value)}
          placeholder="Enter a Skill"
          className="border text-black border-gray-300 rounded py-2 px-3 w-full"
        />
        <button
          onClick={handleAddSkill}
          className="ml-2 bg-blue-500 text-white py-2 px-2 rounded"
        >
          Add Skill
        </button>
      </div>
      {skillList.length > 0 && (
        <div className="grid gap-2 grid-cols-4">
          {skillList.map((skill, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-3 py-2 bg-gray-200 rounded-md text-sm text-gray-800"
            >
              {skill}
              <span
                onClick={() => handleRemoveSkill(index)}
                className="ml-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center -mt-1 -mr-1"
              >
                x
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepTwo;
