import React from "react";

function FeaturedUsers() {
  return (
    <section className="mt-12 text-center text-white">
      <h2 className="text-2xl font-bold mb-4">Featured Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Featured User 1 */}
        <div className="bg-green-300 p-4 rounded-lg shadow-md">
          <img
            src="user1.jpg" // Replace with the URL of the user's profile image
            alt="User 1"
            className="w-16 h-16 mx-auto mb-4 rounded-full"
          />
          <h3 className="text-lg font-medium mb-2">John Doe</h3>
          <p className="text-gray-600">
            Web Developer | Graphic Designer | Photography Enthusiast
          </p>
          {/* Add any other user information */}
        </div>
        {/* Featured User 2 */}
        <div className="bg-orange-300 p-4 rounded-lg shadow-md">
          <img
            src="user2.jpg" // Replace with the URL of the user's profile image
            alt="User 2"
            className="w-16 h-16 mx-auto mb-4 rounded-full"
          />
          <h3 className="text-lg font-medium mb-2">Jane Smith</h3>
          <p className="text-gray-600">
            Digital Marketer | Content Creator | Public Speaker
          </p>
          {/* Add any other user information */}
        </div>
        {/* Add more featured users */}
      </div>
    </section>
  );
}

export default FeaturedUsers;
