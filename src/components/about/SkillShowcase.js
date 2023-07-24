import React from "react";

function SkillShowcase() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Featured Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Skill Card 1 */}
        <div className="bg-yellow-300 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Graphic Design</h3>
          <p className="text-gray-600">
            Learn the art of visual communication and problem-solving.
          </p>
        </div>
        {/* Skill Card 2 */}
        <div className="bg-blue-300 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Web Development</h3>
          <p className="text-gray-600">
            Create websites and web applications using the latest technologies.
          </p>
        </div>
        {/* Skill Card 3 */}
        <div className="bg-purple-300 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Photography</h3>
          <p className="text-gray-600">
            Capture moments and tell stories through your lens.
          </p>
        </div>
        {/* Add more skill cards */}
      </div>
    </section>
  );
}

export default SkillShowcase;
