import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, joinGroup } from "../../reducer/communityGroupsSlice";
import { auth } from "../../firebase/firebaseConfig";

function CommunityGroups() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.data);
  // const user = useSelector((state) => state.auth.user);
  const user = auth.currentUser;

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch, groups]);

  // console.log(user); // Assuming you have the userId in the Redux store

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  // Helper function to check if the user is a member of the group
  const isUserMember = (group) => group.members.includes(user.uid);

  // Function to handle joining a group
  const handleJoinGroup = (groupId) => {
    // Dispatch the joinGroup action to add the user to the group
    dispatch(joinGroup({ groupId, userId: user.uid }));
  };

  const handleViewGroup = (groupId) => {
    console.log("ViewGroup");
  };

  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold mb-4">
        Community Groups with Similar Interests
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Replace the following with your list of community groups */}
        {groups?.map((group) => (
          <div
            key={group?.id}
            className="bg-background p-4 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-bold mb-2">{group?.name}</h3>
            <img
              src={group?.image || "https://via.placeholder.com/300"}
              alt={group?.name}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <p className="text-foreground">{group?.description}</p>
            {/* Render the appropriate button based on membership */}
            {isUserMember(group) ? (
              <button
                className="text-green-500 py-2 px-4"
                onClick={() => handleViewGroup(group.id)}
              >
                View Group
              </button>
            ) : (
              <button
                className="text-blue-500 py-2 px-4"
                onClick={() => handleJoinGroup(group.id)}
              >
                Join Group
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CommunityGroups;

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
