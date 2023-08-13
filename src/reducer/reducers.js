import { combineReducers } from "@reduxjs/toolkit";
import userAuthReducer from "./userAuthSlice";
import userDetailsReducer from "./userDetailsSlice";
import userSkillsReducer from "./userSkillsSlice";
import reviewsReducer from "./reviewsSlice";
import communityGroupsReducer from "./communityGroupsSlice";
import allSkillsReducer from "./AllskillsSlice";
import groupMessagesReducer from "./groupMessagesSlice";
import notificationsReducer from "./notificationsSlice";
import chatMessagesReducer from "./chatMessagesSlice";

const rootReducer = combineReducers({
  auth: userAuthReducer,
  allSkills: allSkillsReducer,
  userDetails: userDetailsReducer,
  userSkills: userSkillsReducer,
  reviews: reviewsReducer,
  groups: communityGroupsReducer,
  groupMessages: groupMessagesReducer,
  notifications: notificationsReducer,
  chatMessages: chatMessagesReducer,
});

export default rootReducer;
