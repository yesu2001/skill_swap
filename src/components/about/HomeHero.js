// Home.js
import React from "react";
import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
    <section className="bg-primary text-white text-center py-16 rounded-lg shadow-md mb-8 transform perspective-800">
      <h2 className="text-5xl font-bold mb-4">Connect and Learn from Others</h2>
      <p className="text-2xl px-10 py-5 mb-8 leading-8">
        SkillFusion is a platform where you can exchange your skills with other
        talented individuals. Teach what you know and learn what you don't.
      </p>
      <Link
        to="/register"
        className="bg-secondary text-white py-2 px-4 rounded-lg font-medium shadow-md hover:bg-opacity-80 transition-colors"
      >
        Get Started
      </Link>
    </section>
  );
};

export default HomeHero;
