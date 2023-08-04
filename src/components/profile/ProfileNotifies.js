import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  acceptSkillsRequest,
  declineSkillsRequest,
  fetchAllNotifications,
} from "../../reducer/notificationsSlice";
import { auth } from "../../firebase/firebaseConfig";

function ProfileNotifies() {
  const dispatch = useDispatch();
  const userNotifications = useSelector((state) => state.notifications.data);
  const allNotifications = useSelector((state) => state.notifications.allData);
  const currentuser = auth.currentUser;

  useEffect(() => {
    dispatch(fetchNotifications(currentuser.uid));
    dispatch(fetchAllNotifications());
  }, [dispatch, allNotifications]);

  console.log(allNotifications);

  const handleAcceptRequest = (senderId, requestId) => {
    dispatch(acceptSkillsRequest({ senderId, requestId }));
  };
  const handleDeclineRequest = (senderId, requestId) => {
    dispatch(declineSkillsRequest({ senderId, requestId }));
  };

  //   console.log(allNotifications);
  return (
    <div className="mb-4 p-6 bg-primary rounded-md">
      <h2 className="text-xl font-bold mb-4">Incoming Skill Requests</h2>
      {userNotifications?.map((request) => (
        <div
          key={request.id}
          className="flex item-center justify-between bg-background p-4 rounded-md shadow-md mb-4"
        >
          <p className="text-grey-200">
            {request.sender_name} wants to learn {request.skill_name}
          </p>
          {request.status === null && (
            <div>
              <button
                onClick={() =>
                  handleAcceptRequest(request.reciever_id, request.id)
                }
                className="text-blue-500 font-semibold px-4  mr-2 rounded-md"
              >
                Accept
              </button>
              <button
                onClick={() =>
                  handleDeclineRequest(request.reciever_id, request.id)
                }
                className="text-red-500 font-semibold px-4 rounded-md"
              >
                Decline
              </button>
            </div>
          )}
          {request.status === "accepted" && (
            <p className="mt-4 text-green-500 font-semibold">
              Request Accepted
            </p>
          )}
          {request.status === "declined" && (
            <p className="mt-4 text-red-500 font-semibold">Request Declined</p>
          )}
        </div>
      ))}
      {userNotifications.map((request) => (
        <div
          key={request.id}
          className="flex item-center justify-between bg-background p-4 rounded-md shadow-md mb-4"
        >
          {request.status !== null && (
            <p className="text-grey-200">
              {request.reciever_name}{" "}
              {request.status === "accepted" ? "accepted" : "declined"} your
              request for learning {request.skill_name}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProfileNotifies;