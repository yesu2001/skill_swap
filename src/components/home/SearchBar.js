import React from "react";

function SearchBar() {
  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold mb-4">Search for Skills or Users</h2>
      <div className="bg-background p-4 rounded-lg shadow-md">
        {/* Replace the following with your search input and functionality */}
        <input
          type="text"
          placeholder="Search for skills or users..."
          className="text-black w-full px-4 py-2 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        {/* Add a search button or icon here */}
      </div>
    </section>
  );
}

export default SearchBar;
