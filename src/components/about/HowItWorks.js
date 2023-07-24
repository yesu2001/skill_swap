import React from "react";

function HowItWorks() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform">
          <h3 className="text-lg font-medium mb-2">1. Sign Up</h3>
          <p className="text-white">
            Create your Skill Swap account by registering with your email and
            password.
          </p>
        </div>
        {/* Step 2 */}
        <div className="bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform">
          <h3 className="text-lg font-medium mb-2">2. List Your Skills</h3>
          <p className="text-white">
            Share the skills you can offer and the skills you want to learn.
          </p>
        </div>
        {/* Step 3 */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform">
          <h3 className="text-lg font-medium mb-2">3. Connect and Swap</h3>
          <p className="text-white">
            Connect with others, schedule skill exchange sessions, and start
            learning from each other.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
