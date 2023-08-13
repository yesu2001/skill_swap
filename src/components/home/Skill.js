import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNotify } from "../../reducer/notificationsSlice";
import { auth } from "../../firebase/firebaseConfig";
import { requestSkill } from "../../reducer/userSkillsSlice";
import { fetchUserDetails } from "../../reducer/userDetailsSlice";
import { getCurrentDateFormatted } from "../../helper/getTodayDate";
import generateCustomId from "../../helper/generateCustomId";
import OfferRequest from "../popups/OfferRequest";
import { createChat } from "../../reducer/chatMessagesSlice";
import generateCustomID from "../../helper/generateCustomId";

function Skill({ skill }) {
  const dispatch = useDispatch();
  const currentUser = auth.currentUser;
  const [show, setShow] = useState(false);
  const currentUserDetails = useSelector((state) => state.userDetails.data);
  useEffect(() => {
    fetchUserDetails(currentUser?.uid);
  }, [dispatch]);

  // console.log(currentUserDetails);
  const isUserIdPresent = skill?.members_requested?.some(
    (obj) => obj.id === currentUser.id
  );

  const isUserAccepted = skill?.members_requested?.some(
    (obj) => obj.status === "accepted"
  );
  const handleInterested = () => {
    setShow(true);
  };

  const handleSendRequest = (data) => {
    console.log(data);
    const nid = generateCustomId();
    const currentDate = getCurrentDateFormatted();
    const notifyData = {
      id: nid,
      isRead: false,
      skill_id: skill.skill_id,
      skill_name: skill.skillName,
      sender_id: currentUser?.uid,
      sender_name: currentUserDetails?.name,
      status: null,
      reciever_id: data.skilluserId,
      reciever_name: skill.user_name,
      skillOffered: data.exchangeSkill,
      timeStamp: currentDate,
    };
    console.log(notifyData);
    dispatch(requestSkill({ userId: currentUser?.uid, skill }));
    dispatch(createNotify({ notifyData }));
    setShow(false);
  };

  const handleConnect = () => {
    const chatId = generateCustomID();
    const chatData = {
      chat_id: chatId,
      user1_name: skill.user_name,
      user1_id: skill.user_id,
      user2_name: currentUserDetails?.name,
      user2_id: currentUserDetails?.id,
    };
    dispatch(createChat({ chatData }));
  };
  // console.log(isUserAccepted);
  // console.log(isUserIdPresent);

  return (
    <div key={skill?.user_id} className="bg-primary p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2 text-white">{skill.skillName}</h3>
      <img
        src={skill.image || "https://via.placeholder.com/300"}
        alt={skill.skillName}
        className="w-full h-32 object-cover rounded-lg mb-2"
      />
      <p className="text-foreground">{skill.description}</p>
      <div className="flex items-center justify-between my-2">
        <p className="text-foreground mt-2">Posted by:</p>
        <p className="text-foreground mt-2">{skill?.user_name}</p>
      </div>
      {isUserIdPresent && isUserAccepted ? (
        <button
          className="w-full bg-blue-500  text-white-500 px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-blue-400 mt-2"
          onClick={handleConnect}
        >
          Connect
        </button>
      ) : isUserIdPresent ? (
        <p className="w-full text-center text-gray-500 px-4 py-2  mt-2">
          Request Sent
        </p>
      ) : (
        <button
          className="w-full border-green-500 border-2 text-green-500 px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-blue-400 mt-2"
          onClick={handleInterested}
        >
          I'm Interested
        </button>
      )}

      {show && (
        <OfferRequest
          setShow={setShow}
          show={show}
          onSend={handleSendRequest}
          skilluserId={skill.user_id}
        />
      )}
    </div>
  );
}

export default Skill;
