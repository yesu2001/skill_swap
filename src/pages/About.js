import React from "react";
import {
  AboutHero,
  AboutBenefits,
  AboutFeaturedUsers,
  AboutHowItWorks,
  AboutSkillShowcase,
  AboutTestimonials,
} from "../components/about";

function About() {
  return (
    <div className=" min-h-screen py-8 px-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <main>
          {/* Hero section */}
          <AboutHero />

          {/* How it Works section */}
          <AboutBenefits />

          {/* Three Steps to Get Started Section */}
          <section className="mt-12 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Three Steps to Get Started
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-blue-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
                <i className="fas fa-search text-4xl text-white mb-4"></i>
                <h3 className="text-xl font-medium mb-2">Explore Skills</h3>
                <p className="text-white">
                  Browse through a wide range of skills offered by other users
                  on the platform.
                </p>
              </div>
              {/* Step 2 */}
              <div className="bg-green-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
                <i className="fas fa-users text-4xl text-white mb-4"></i>
                <h3 className="text-xl font-medium mb-2">Connect with Users</h3>
                <p className="text-white">
                  Connect with like-minded individuals and propose skill
                  exchange opportunities.
                </p>
              </div>
              {/* Step 3 */}
              <div className="bg-purple-500 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
                <i className="fas fa-exchange-alt text-4xl text-white mb-4"></i>
                <h3 className="text-xl font-medium mb-2">Exchange Skills</h3>
                <p className="text-white">
                  Teach your skills to others and learn new skills in return
                  from fellow users.
                </p>
              </div>
            </div>
          </section>

          {/* Skills Showcase Section */}
          <AboutSkillShowcase />

          {/* Featured Users Section */}
          <AboutFeaturedUsers />

          {/* Benefits Section */}
          <AboutBenefits />

          {/* Testimonials Section */}
          <AboutTestimonials />
        </main>
      </div>
    </div>
  );
}

export default About;
