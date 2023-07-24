import React from "react";

function Benefits() {
  return (
    <section className="mt-12 text-center text-white">
      <h2 className="text-2xl font-bold mb-4">Why Choose Skill Swap?</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Benefit 1 */}
        <li className="bg-blue-500 p-6 rounded-lg shadow-md">
          <i className="fas fa-users text-4xl text-white mb-4"></i>
          <h3 className="text-xl font-medium mb-2">
            Connect with Talented People
          </h3>
          <p className="text-white">
            Build a network of like-minded individuals and collaborate on
            exciting projects.
          </p>
        </li>
        {/* Benefit 2 */}
        <li className="bg-green-500 p-6 rounded-lg shadow-md">
          <i className="fas fa-graduation-cap text-4xl text-white mb-4"></i>
          <h3 className="text-xl font-medium mb-2">Expand Your Skill Set</h3>
          <p className="text-white">
            Learn new skills and gain valuable knowledge from experts in various
            fields.
          </p>
        </li>
        {/* Benefit 3 */}
        <li className="bg-purple-500 p-6 rounded-lg shadow-md">
          <i className="fas fa-exchange-alt text-4xl text-white mb-4"></i>
          <h3 className="text-xl font-medium mb-2">Share Your Knowledge</h3>
          <p className="text-white">
            Teach others what you know and make a positive impact on their
            lives.
          </p>
        </li>
      </ul>
    </section>
  );
}

export default Benefits;
