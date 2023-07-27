import React, { useState, useEffect } from "react";

const StepThree = ({ formData, handleChange }) => {
  // State for skills to learn
  const initialSkillList = Array.isArray(formData.skillsToLearn)
    ? [...formData.skillsToLearn]
    : [];
  const [skillsLearn, setSkillsLearn] = useState(initialSkillList);
  const [skillLearnValue, setSkillLearnValue] = useState("");

  useEffect(() => {
    handleChange(skillsLearn);
  }, [skillsLearn, handleChange]);

  const handleChangeSkillLearnValue = () => {
    if (skillLearnValue.trim() !== "") {
      setSkillsLearn([...skillsLearn, skillLearnValue]);
      setSkillLearnValue("");
    }
  };
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Step 3: Skills to Learn</h2>
      <div className="flex items-center justify-between mb-2">
        <input
          type="text"
          value={skillLearnValue}
          onChange={(e) => setSkillLearnValue(e.target.value)}
          placeholder="Enter a Skill to Learn"
          className="border border-gray-300 text-black rounded py-2 px-3 w-full"
        />
        <button
          onClick={handleChangeSkillLearnValue}
          className="ml-2 w-40  text-blue-500 py-2 px-2 border border-blue-500 rounded"
        >
          Add skill
        </button>
      </div>
      {skillsLearn.length > 0 && (
        <div className="grid gap-2 grid-cols-4">
          {skillsLearn.map((skill, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-3 py-2 bg-gray-200 rounded-md text-sm text-gray-800"
            >
              {skill}
              <span
                onClick={() =>
                  setSkillsLearn((prevSkills) =>
                    prevSkills.filter((_, i) => i !== index)
                  )
                }
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

export default StepThree;
