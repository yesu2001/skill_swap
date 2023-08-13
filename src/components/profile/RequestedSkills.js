import React from "react";
import Skill from "../home/Skill";

function RequestedSkills({ skillsRequestedByCurrentUser }) {
  return (
    <div className="bg-primary mt-6 p-6 rounded-lg shadow-md flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Requested Skills</h2>
      </div>
      <div className="flex items-center gap-8">
        {skillsRequestedByCurrentUser?.map((skillItem) =>
          skillItem.map((skill, index) => <Skill skill={skill} key={index} />)
        )}
      </div>
    </div>
  );
}

export default RequestedSkills;
