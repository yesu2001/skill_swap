import React from "react";

function Home() {
  return (
    <div className="bg-primary min-h-screen text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Search for skill or users section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Search for Skills or Users
          </h2>
          <div className="bg-background p-4 rounded-lg shadow-md">
            {/* Replace the following with your search input and functionality */}
            <input
              type="text"
              placeholder="Search for skills or users..."
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {/* Add a search button or icon here */}
          </div>
        </section>

        {/* List of skills based on categories section */}
        <section className="mb-8">
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

        {/* Users based on interests section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Users with Similar Interests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Replace the following with your list of users */}
            {dummyUsers.map((user) => (
              <div
                key={user.id}
                className="bg-background p-4 rounded-lg shadow-md"
              >
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-16 h-16 object-cover rounded-full mb-2"
                />
                <h3 className="text-lg font-bold mb-2">{user.name}</h3>
                <p className="text-foreground">{user.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Community groups based on interests section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Community Groups with Similar Interests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Replace the following with your list of community groups */}
            {dummyGroups.map((group) => (
              <div
                key={group.id}
                className="bg-background p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold mb-2">{group.name}</h3>
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <p className="text-foreground">{group.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback from users section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">User Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Replace the following with your user feedback or testimonials */}
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
        </section>
      </div>
    </div>
  );
}

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

const dummyUsers = [
  {
    id: 1,
    name: "John Doe",
    profilePicture: "https://via.placeholder.com/150",
    bio: "Web developer passionate about creating user-friendly experiences.",
  },
  {
    id: 2,
    name: "Jane Smith",
    profilePicture: "https://via.placeholder.com/150",
    bio: "Graphic designer with a flair for creativity and innovative designs.",
  },
  // Add more users as needed
];

const dummyGroups = [
  {
    id: 1,
    name: "Web Dev Enthusiasts",
    image: "https://via.placeholder.com/300",
    description:
      "A community of web developers sharing knowledge and projects.",
  },
  {
    id: 2,
    name: "Designers United",
    image: "https://via.placeholder.com/300",
    description:
      "A group of designers collaborating on exciting design projects.",
  },
  // Add more groups as needed
];

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
