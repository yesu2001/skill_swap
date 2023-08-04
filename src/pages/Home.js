import React from "react";
import SearchBar from "../components/home/SearchBar";
import SkillCategories from "../components/home/SkillCategories";
import UserCategories from "../components/home/UserCategories";
import CommunityGroups from "../components/home/CommunityGroups";
import Testimonials from "../components/home/Testimonials";

function Home() {
  return (
    <div className="bg-background min-h-screen text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Search for skill or users section */}
        <SearchBar />

        {/* List of skills based on categories section */}
        <SkillCategories />
        {/* Users based on interests section */}
        <UserCategories />
        {/* Community groups based on interests section */}
        <CommunityGroups />
        {/* Feedback from users section */}
        <Testimonials />
        {/* <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4">User Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Replace the following with your user feedback or testimonials 
            {dummyFeedback.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-background p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold mb-2">{feedback.name}</h3>
                <p className="text-foreground">{feedback.message}</p>
              </div>
            ))}
          </div>
        </section> */}
      </div>
    </div>
  );
}

const dummyFeedback = [
  {
    id: 1,
    name: "Sam Brown",
    message: "SkillFusion has been a game-changer for my learning journey!",
  },
  {
    id: 2,
    name: "Emily White",
    message: "Ive found incredible mentors and friends through this platform.",
  },
  // Add more feedback as needed
];

export default Home;
