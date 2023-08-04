import React, { useState } from "react";

export default function SkillFormPopup({
  onClose,
  onSave,
  isEdit,
  onUpdate,
  skill,
}) {
  const [skillName, setSkillName] = useState(isEdit ? skill[0].skillName : "");
  const [experience, setExperience] = useState(
    isEdit ? skill[0].experience : 0
  );
  const [proficiency, setProficiency] = useState(
    isEdit ? skill[0].proficiency : ""
  );
  const [description, setDescription] = useState(
    isEdit ? skill[0].description : ""
  );

  const handleSave = () => {
    if (!skillName || !experience || !proficiency || !description) {
      alert("Please fill out all fields");
      return;
    }
    onSave({
      skillName,
      experience,
      proficiency,
      description,
    });
    setSkillName("");
    setExperience("");
    setProficiency("");
    setDescription("");
    onClose();
  };

  const handleUpdate = () => {
    const updatedSkill = {
      skillName,
      experience,
      proficiency,
      description,
    };
    onUpdate(updatedSkill);
    onClose();
  };

  return (
    <div className="bg-primary fixed inset-0 flex items-center justify-center">
      <div className="bg-background p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Skill</h2>
        <div className="mb-4">
          <label
            htmlFor="skillName"
            className="block font-medium text-foreground"
          >
            Skill Name
          </label>
          <input
            id="skillName"
            type="text"
            className="text-black w-full px-3 py-2 border border-foreground rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="experience"
            className="block font-medium text-foreground"
          >
            Experience
          </label>
          <input
            id="experience"
            type="number"
            className="text-black w-full px-3 py-2 border border-foreground rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="proficiency"
            className="block font-medium text-foreground"
          >
            Proficiency
          </label>
          <select
            id="proficiency"
            className="text-black w-full px-3 py-2 border border-foreground rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
            <option value="Legend">Legend</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block font-medium text-foreground"
          >
            Description
          </label>
          <textarea
            id="description"
            className="text-black w-full px-3 py-2 border border-foreground rounded-md focus:outline-none focus:ring focus:border-blue-500"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
            onClick={isEdit ? handleUpdate : handleSave}
          >
            {isEdit ? "Update" : "Save"}
          </button>
          <button
            className="ml-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
