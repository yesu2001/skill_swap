import React from "react";

function SkillCategories() {
  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold mb-4">Skills by Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Replace the following with your list of skills */}
        {dummySkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-background p-4 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-bold mb-2">{skill.name}</h3>
            <img
              src={skill.image}
              alt={skill.name}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <p className="text-foreground">{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillCategories;

// Dummy data for skills, users, groups, and feedback
const dummySkills = [
  {
    id: 1,
    name: "Web Development",
    image: "https://via.placeholder.com/300",
    description: "Learn web development skills and build modern websites.",
  },
  {
    id: 2,
    name: "Graphic Design",
    image: "https://via.placeholder.com/300",
    description: "Master graphic design tools and create stunning visuals.",
  },
  // Add more skills as needed
];
