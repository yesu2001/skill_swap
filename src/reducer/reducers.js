import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userDetailsReducer from "./userDetailsSlice";
import userSkillsReducer from "./userSkillsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  userDetails: userDetailsReducer,
  userSkills: userSkillsReducer,
});

export default rootReducer;
