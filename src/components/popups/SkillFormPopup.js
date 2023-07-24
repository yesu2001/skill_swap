import React, { useState } from "react";

// SkillForm component to handle skill input fields in the modal
export default function SkillFormPopup({ onClose, onSave }) {
  const [skillName, setSkillName] = useState("");
  const [experience, setExperience] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    // Validate the inputs before saving (you can add more validation if needed)
    if (!skillName || !experience || !proficiency || !description) {
      alert("Please fill out all fields");
      return;
    }

    // Call the onSave function with the skill details
    onSave({
      skillName,
      experience,
      proficiency,
      description,
    });

    // Reset the input fields
    setSkillName("");
    setExperience("");
    setProficiency("");
    setDescription("");

    // Close the modal
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
            type="text"
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
          <input
            id="proficiency"
            type="text"
            className="text-black w-full px-3 py-2 border border-foreground rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value)}
          />
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
            onClick={handleSave}
          >
            Save
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
