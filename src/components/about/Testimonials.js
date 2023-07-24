import React from "react";

function Testimonials() {
  return (
    <section className="py-16 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-center mb-4">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Testimonial 1 */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 p-4 rounded-lg shadow-md">
          <p className="text-white">
            "Skill Swap has been an amazing platform for me to learn new skills.
            I never thought I could learn web development, but now I'm building
            my own websites!"
          </p>
          <p className="text-white mt-2 font-medium">John Doe</p>
        </div>
        {/* Testimonial 2 */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 p-4 rounded-lg shadow-md">
          <p className="text-white">
            "I love teaching others what I know and Skill Swap gives me the
            perfect opportunity to share my passion for photography with
            others."
          </p>
          <p className="text-white mt-2 font-medium">Jane Smith</p>
        </div>
        {/* Add more testimonials */}
      </div>
    </section>
  );
}

export default Testimonials;
