import React from "react";
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";

function SearchBar() {
  // Inside the component
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchUserResults, setSearchUserResults] = useState([]);
  const [searchSkillresults, setSearchSkillresults] = useState([]);
  const handleSearch = async () => {
    if (searchKeyword.trim() === "") {
      // If the search keyword is empty, reset the search results
      setSearchUserResults([]);
      setSearchSkillresults([]);
      return;
    }

    try {
      const userProfilesRef = collection(db, "user_profiles");
      const userSkillsRef = collection(db, "user_skills");

      // console.log(userProfilesRef);

      console.log(searchKeyword);

      // Perform two separate queries for user profiles and user skills
      const userProfileQuery = query(
        userProfilesRef,
        where("name", ">=", searchKeyword)
      );
      const userSkillsQuery = query(
        userSkillsRef,
        where("skill_listing", "array-contains", "skillName", searchKeyword)
      );

      // console.log(userProfileQuery);
      console.log(userSkillsQuery);
      // Execute the queries in parallel using Promise.all
      const [userProfileSnapshot, userSkillsSnapshot] = await Promise.all([
        getDocs(userProfileQuery),
        getDocs(userSkillsQuery),
      ]);

      // Combine the results from user profiles and user skills
      const combinedResults = [
        ...userProfileSnapshot.docs.map((doc) => doc.data()),
        ...userSkillsSnapshot.docs.map((doc) => doc.data()),
      ];

      setSearchUserResults([
        ...userProfileSnapshot.docs.map((doc) => doc.data()),
      ]);
      setSearchSkillresults(
        ...userSkillsSnapshot.docs.map((doc) => doc.data())
      );
      console.log(searchSkillresults);
    } catch (error) {
      console.error("Error searching for skills and users:", error);
    }
  };

  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold mb-4">Search for Skills or Users</h2>
      <div className="bg-background p-4 rounded-lg shadow-md flex items-center">
        <input
          type="text"
          placeholder="Search for skills or users..."
          className="text-black w-full px-4 py-2 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
        />
        <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="mt-4">
        {searchUserResults?.length > 0 ? (
          <div>
            {searchUserResults?.map((result, index) => (
              <div className="bg-background p-4 rounded-lg shadow-md flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={result.photo}
                    alt={result.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p className="text-lg font-bold">{result.name}</p>
                </div>
                <Link
                  to={`/profile/${result.id}`} // Assuming the route to view a user's profile is "/profile/:id"
                  className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
                >
                  View Profile
                </Link>
              </div>
            ))}
            {searchSkillresults?.map((result, index) => (
              <div
                key={index}
                className="bg-background p-4 rounded-lg shadow-md"
              >
                <div>
                  <h3 className="text-lg font-bold mb-2">{result.skillName}</h3>
                  <p>Offered By: {result.userName}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </section>
  );
}

export default SearchBar;
