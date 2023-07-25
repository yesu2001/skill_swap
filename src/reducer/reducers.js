import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userDetailsReducer from "./userDetailsSlice";
import userSkillsReducer from "./userSkillsSlice";
import reviewsReducer from "./reviewsSlice";
import communityGroupsReducer from "./communityGroupsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  userDetails: userDetailsReducer,
  userSkills: userSkillsReducer,
  reviews: reviewsReducer,
  groups: communityGroupsReducer,
});

export default rootReducer;
