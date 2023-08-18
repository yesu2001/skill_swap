import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../../reducer/userDetailsSlice";

function UserCategories() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.userDetails.usersData);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4">Users with Similar Interests</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Replace the following with your list of users */}
        {allUsers?.map((user) => (
          <div key={user?.id} className="bg-primary p-4 rounded-lg shadow-md">
            <img
              src={user?.photo || "https://via.placeholder.com/150"}
              alt={user?.name}
              className="w-16 h-16 object-cover rounded-full mb-2"
            />
            <h3 className="text-lg font-bold mb-2">{user?.name}</h3>
            <p className="text-foreground">{user?.bio.substring(0, 40)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UserCategories;

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
