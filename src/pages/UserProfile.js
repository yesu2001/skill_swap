import React, { useEffect } from "react";
import { useParams } from "react-router";
import { fetchUserDetails } from "../reducer/userDetailsSlice";
import { fetchUserSkills } from "../reducer/userSkillsSlice";
import { useDispatch, useSelector } from "react-redux";
import defaultPic from "../assets/default_pic.jpg";
import { auth } from "../firebase/firebaseConfig";

function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = auth.currentUser;
  const currentUserId = currentUser?.uid;
  useEffect(() => {
    // Fetch user profile and skills based on the user id
    dispatch(fetchUserDetails(id));
    dispatch(fetchUserSkills(id));
  }, [dispatch, id]);

  const userProfile = useSelector((state) => state.userDetails.data);
  const userSkills = useSelector((state) => state.userSkills.data);

  console.log(userProfile);

  return (
    <div className="bg-background min-h-screen text-white">
      <div className="max-w-4xl mx-auto py-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 direction-column items-center justify-center">
            {userProfile && (
              <img
                src={userProfile.photo || defaultPic}
                alt={userProfile.name}
                className="w-40 h-40 rounded-full mx-auto"
              />
            )}
            <h2 className="text-2xl text-center font-bold mt-4">
              {userProfile?.name}
            </h2>
            {userProfile && (
              <p className="text-gray-400 text-center">
                @{userProfile.username}
              </p>
            )}
            {currentUserId !== userProfile?.id && (
              <div className="my-4 flex items-center justify-around">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Connect
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                  Chat
                </button>
              </div>
            )}
            {/* Add social media links here if available */}
            {userProfile?.bio && (
              <p className="mt-4 text-center">{userProfile.bio}</p>
            )}
          </div>
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">Skills</h3>
            {userSkills && userSkills.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {userSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-primary p-4 rounded-lg shadow-md"
                  >
                    <h4 className="text-lg font-bold">{skill.skillName}</h4>
                    <p className="text-foreground">
                      Proficiency: {skill.proficiency}
                    </p>
                    {/* Add other skill details as needed */}
                  </div>
                ))}
              </div>
            ) : (
              <p>No skills listed</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

// design 1
// {/* <div className="bg-background min-h-screen text-white p-4">
//   <div className="bg-primary max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
//     <div className="relative">
//       {userProfile && (
//         <img
//           src={userProfile.photo}
//           alt={userProfile.name}
//           className="w-full h-48 object-cover"
//         />
//       )}
//       <div className="absolute top-4 right-4">
//         <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500">
//           Connect / Chat
//         </button>
//       </div>
//     </div>
//     <div className="p-4">
//       {userProfile && (
//         <>
//           <h3 className="text-2xl font-bold mb-2">{userProfile.name}</h3>
//           <p className="text-gray-400 mb-4">{userProfile.email}</p>
//           {/* Add other user details as needed */}
//         </>
//       )}
//       {userSkills && userSkills.length > 0 && (
//         <div>
//           <h3 className="text-2xl font-bold mb-4">Skills</h3>
//           {userSkills.map((skill) => (
//             <div key={skill.id} className="mb-2">
//               <p className="text-lg font-bold">{skill.skillName}</p>
//               <p className="text-gray-400">Proficiency: {skill.proficiency}</p>
//               {/* Add other skill details as needed */}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   </div>
// </div>; */}

// design 2
// {/* <div className="bg-background min-h-screen text-white p-4">
//       <div className="bg-primary max-w-lg mx-auto">
//         <div className="flex items-center justify-between mb-4">
//           <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500">
//             Connect / Chat
//           </button>
//           {userProfile && (
//             <img
//               src={userProfile.photo}
//               alt={userProfile.name}
//               className="w-16 h-16 rounded-full border-4 border-primary"
//             />
//           )}
//         </div>
//         {userProfile && (
//           <div className="px-6 py-4">
//             <div className="font-bold text-3xl mb-2">{userProfile.name}</div>
//             <p className="text-gray-400">@{userProfile.username}</p>
//             {/* Add other user details as needed */}
//           </div>
//         )}
//         {userSkills && userSkills.length > 0 && (
//           <div className="px-6 py-4">
//             <h3 className="font-bold text-2xl mb-4">Skills</h3>
//             {userSkills.map((skill) => (
//               <div key={skill.id} className="mb-2">
//                 <p className="text-xl font-bold">{skill.skillName}</p>
//                 <p className="text-gray-400">
//                   Proficiency: {skill.proficiency}
//                 </p>
//                 {/* Add other skill details as needed */}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div> */}

// design 3

// design 4
// {/* <div className="bg-background min-h-screen text-white p-4">
//       <div className="max-w-3xl mx-auto">
//         {userProfile && (
//           <div className="bg-primary rounded-lg p-6 mb-8">
//             <div className="flex items-center justify-between mb-4">
//               <img
//                 src={userProfile.photo}
//                 alt={userProfile.name}
//                 className="w-16 h-16 rounded-full"
//               />
//               <button className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500">
//                 Connect / Chat
//               </button>
//             </div>
//             <div className="font-bold text-2xl mb-2">{userProfile.name}</div>
//             <p className="text-gray-400 mb-4">{userProfile.email}</p>
//             {/* Add other user details as needed */}
//           </div>
//         )}

//         {userSkills && userSkills.length > 0 && (
//           <div className="grid grid-cols-2 gap-4">
//             {userSkills.map((skill) => (
//               <div key={skill.id} className="bg-primary rounded-lg p-6">
//                 <h3 className="font-bold text-xl mb-4">{skill.skillName}</h3>
//                 <p className="text-foreground">
//                   Proficiency: {skill.proficiency}
//                 </p>
//                 {/* Add other skill details as needed */}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div> */}
